odoo.define('CepNewDashboard.CepNewDashboard', function (require) {
    'use strict';
    var AbstractAction = require('web.AbstractAction');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var web_client = require('web.web_client');
    var _t = core._t;
    var QWeb = core.qweb;
    var self = this;
    var currency;
    var ActionMenu = AbstractAction.extend({
        contentTemplate: 'CepNewDashboard',
        
        events:{
            'click #open_brands': 'open_brands',
            'click #open_products': 'open_products',
            'click #open_vendors': 'open_vendors',
            'click #open_orders': 'open_orders',
        },

        open_orders: function (ev) {
            var posted = false;
            var self = this;
            //var company = odoo.session_info.user_context.allowed_company_ids;
            rpc.query({
                model: "order",
                method: "click_orders",
            }).then(function (result) {
                self.do_action({
                    res_model: 'order',
                    name: _t('Orders'),
                    domain: [],
                    views: [[false, 'list'], [false, 'form']],
                    type: 'ir.actions.act_window',
                });
            })
        },
        
        open_vendors: function (ev) {
            var posted = false;
            var self = this;
            rpc.query({
                model: "res.partner",
                method: "click_vendors",
            }).then(function (result) {
                self.do_action({
                    res_model: 'res.partner',
                    name: _t('Vendors'),
                    domain: [],      
                    views: [[false, 'list'], [false, 'form']],
                    type: 'ir.actions.act_window',
                });
            })
        },

        open_products: function (ev) {
            var posted = false;
            var self = this;
            rpc.query({
                model: "product",
                method: "click_products",
            }).then(function (result) {
                self.do_action({
                    res_model: 'product',
                    name: _t('Products'),
                    
                    domain: [],
                    views: [[false, 'list'],[false,'form']],
                    type: 'ir.actions.act_window'
                });
            })
        },
        
        open_brands: function (ev) {
            var posted = false;
            var self = this;
            rpc.query({
                model: "brand",
                method: "click_brands",
            }).then(function (result) {
                self.do_action({
                    res_model: 'brand',
                    name: _t('Brand'),
                    views: [[false, 'list'], [false, 'form']],
                    type: 'ir.actions.act_window',
                });
            })
        },

        renderElement: function (ev) {
            var self = this;
            //var uid = odoo.session_info.user_context;
            $.when(this._super())
                .then(function (ev) {
                    
                    //Count brands
                    rpc.query({                        
                        model: "brand",
                        method: "get_brand_count",
                    })
                    .then(function (result) {
                        if(!$('#brand_count_added').length){    
                            $('#brand_count').append('<span id ="brand_count_added">' + result.brand_count + '</span>');
                        }
                    });

                
                    //Count product
                    rpc.query({                        
                        model: "product",
                        method: "get_product_count",
                    })
                    .then(function (result) {
                        if(!$('#product_count_added').length){    
                            $('#product_count').append('<span id ="product_count_added">' + result.product_count + '</span>');  
                        }
                    });

                    //Count vendors
                    rpc.query({                        
                        model: "res.partner",
                        method: "get_vendor_count",
                    })
                    .then(function (result) {
                        if(!$('#vendor_count_added').length){    
                            $('#vendor_count').append('<span id = "vendor_count_added">' + result.vendor_count + '</span>');
                        }
                    });

                    //Count orders
                    rpc.query({                        
                        model: "order",
                        method: "get_order_count",
                    })
                    .then(function (result) {
                        if(!$('#order_count_added').length){    
                            $('#order_count').append('<span id="order_count_added">' + result.order_count + '</span>');
                        }
                    });

                    
                    //Feedback Filing Report
                    rpc.query({
                        model: "product",
                        method: "get_tickets_by_month",
                        args:[uid],
                    })
                    .then(function (result) {
                        if ($("#feedBackFilingReport").length) {
                            var tickets_labels = result.tickets_labels; // Add data values to array                       
                            var tickets_dict = result.tickets_dict; // Add labels to array
                        
                            var feedBackFilingReportChart = document.getElementById("feedBackFilingReport").getContext('2d');
                            var feedBackFilingReportData = {
                                labels: tickets_labels,
                                datasets: [{
                                    label: 'Total',
                                    data: tickets_dict,
                                    backgroundColor: "#52CDFF",
                                    borderColor: [
                                        '#52CDFF',
                                    ],
                                    borderWidth: 0,
                                    fill: true, // 3: no fill
                                    
                                }]
                            };
                        
                            var feedBackFilingReportOptions = {
                              responsive: true,
                              maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display: true,
                                            drawBorder: false,
                                            color:"rgba(255,255,255,.05)",
                                            zeroLineColor: "rgba(255,255,255,.05)",
                                        },
                                        ticks: {
                                          beginAtZero: true,
                                          autoSkip: true,
                                          maxTicksLimit: 5,
                                          fontSize: 10,
                                          color:"#6B778C"
                                        }
                                    }],
                                    xAxes: [{
                                      barPercentage: 0.5,
                                      gridLines: {
                                          display: false,
                                          drawBorder: false,
                                      },
                                      ticks: {
                                        beginAtZero: false,
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                        fontSize: 10,
                                        color:"#6B778C"
                                      }
                                  }],
                                },
                                legend:false,
                                
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    }
                                },
                                tooltips: {
                                    backgroundColor: 'rgba(31, 59, 179, 1)',
                                }
                            }
                            var feedBackFilingReport = new Chart(feedBackFilingReportChart, {
                                type: 'bar',
                                data: feedBackFilingReportData,
                                options: feedBackFilingReportOptions
                            });
                          }   
                    });

                    //Issues Resolved
                    rpc.query({
                        model: "product",
                        method: "get_tickets_resolved",
                        args:[uid],
                    })
                    .then(function (result) {
                        if ($("#feedBackSolved").length) {
                            var tickets_labels = result.tickets_labels; // Add data values to array                       
                            var tickets_dict = result.tickets_dict; // Add labels to array
                        

                            var feedBackSolvedChart = document.getElementById("feedBackSolved").getContext('2d');
                            var feedBackSolvedData = {
                                labels: tickets_labels,
                                datasets: [{
                                    label: 'Total',
                                    data: tickets_dict,
                                    backgroundColor: "#ffcf3f",
                                    borderColor: [
                                        '#ffcf3f',
                                    ],
                                    borderWidth: 0,
                                    fill: true, // 3: no fill
                                    
                                }]
                            };
                        
                            var feedBackSolvedOptions = {
                              responsive: true,
                              maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display: true,
                                            drawBorder: false,
                                            color:"rgba(255,255,255,.05)",
                                            zeroLineColor: "rgba(255,255,255,.05)",
                                        },
                                        ticks: {
                                          beginAtZero: true,
                                          autoSkip: true,
                                          maxTicksLimit: 5,
                                          fontSize: 10,
                                          color:"#6B778C"
                                        }
                                    }],
                                    xAxes: [{
                                      barPercentage: 0.5,
                                      gridLines: {
                                          display: false,
                                          drawBorder: false,
                                      },
                                      ticks: {
                                        beginAtZero: false,
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                        fontSize: 10,
                                        color:"#6B778C"
                                      }
                                  }],
                                },
                                legend:false,
                                
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    }
                                },
                                tooltips: {
                                    backgroundColor: 'rgba(31, 59, 179, 1)',
                                }
                            }
                            var feedBackSolved = new Chart(feedBackSolvedChart, {
                                type: 'bar',
                                data: feedBackSolvedData,
                                options: feedBackSolvedOptions
                            });
                          } 
                    });

                    //Feedback by Source
                    rpc.query({
                        model: "product",
                        method: "feedback_by_source",
                        args:[uid],
                    }).then(function (result) {
                        var tickets_labels = result.tickets_labels; // Add data values to array                       
                        var tickets_dict = result.tickets_dict; // Add labels to array
                        if ($("#feedBackSource").length) {
                            var feedBackSourceCanvas = $("#feedBackSource").get(0).getContext("2d");
                            var doughnutPieData = {
                              datasets: [{
                                data: tickets_dict,
                                backgroundColor: [
                                  "#1F3BB3",
                                  "#FDD0C7",
                                ],
                                borderColor: [
                                  "#1F3BB3",
                                  "#FDD0C7",
                                ],
                              }],
                        
                              // These labels appear in the legend and in the tooltips when hovering different arcs
                              labels: tickets_labels,   
                            };
                            var doughnutPieOptions = {
                              cutoutPercentage: 50,
                              animationEasing: "easeOutBounce",
                              animateRotate: true,
                              animateScale: false,
                              responsive: true,
                              maintainAspectRatio: true,
                              showScale: true,
                              legend: false,
                              legendCallback: function (chart) {
                                var text = [];
                                text.push('<div class="chartjs-legend"><ul class="justify-content-center">');
                                for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                                  text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">');
                                  text.push('</span>');
                                  if (chart.data.labels[i]) {
                                    text.push(chart.data.labels[i]);
                                  }
                                  text.push('</li>');
                                }
                                text.push('</div></ul>');
                                return text.join("");
                              },
                              
                              layout: {
                                padding: {
                                  left: 0,
                                  right: 0,
                                  top: 0,
                                  bottom: 0
                                }
                              },
                              tooltips: {
                                callbacks: {
                                  title: function(tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                  },
                                  label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']];
                                  }
                                },
                                  
                                backgroundColor: '#fff',
                                titleFontSize: 14,
                                titleFontColor: '#0B0F32',
                                bodyFontColor: '#737F8B',
                                bodyFontSize: 11,
                                displayColors: false
                              }
                            };
                            var feedBackSource = new Chart(feedBackSourceCanvas, {
                              type: 'doughnut',
                              data: doughnutPieData,
                              options: doughnutPieOptions
                            });
                            document.getElementById('doughnut-chart-legend').innerHTML = feedBackSource.generateLegend();
                          }
                    });


                    //Tickets vs Leads Line Chart
                    rpc.query({
                        model: "product",
                        method: "get_tickets_vs_leads",
                        args:[uid],    
                    })
                    .then(function (result) {
                        if ($("#performaneLine").length) {
                            var ticket_labels = result.tickets_labels;
                            var ticket_data = result.tickets_dict;
                            var lead_data = result.leads_dict;
                            
                            console.log(ticket_labels)
                            console.log(ticket_data)
                            var graphGradient = document.getElementById("performaneLine").getContext('2d');
                            var graphGradient2 = document.getElementById("performaneLine").getContext('2d');
                            
                            var saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
                            saleGradientBg.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
                            saleGradientBg.addColorStop(1, 'rgba(26, 115, 232, 0.02)');
                            
                            var saleGradientBg2 = graphGradient2.createLinearGradient(100, 0, 50, 150);
                            saleGradientBg2.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
                            saleGradientBg2.addColorStop(1, 'rgba(0, 208, 255, 0.03)');
                            var salesTopData = {
                                labels: ticket_labels,
                                datasets: [{
                                    label: 'No. Of Feedback',
                                    data: ticket_data,
                                    backgroundColor: saleGradientBg,
                                    borderColor: [
                                        '#1F3BB3',
                                    ],
                                    borderWidth: 1.5,
                                    fill: true, // 3: no fill
                                    pointBorderWidth: 1,
                                    pointRadius: [4, 4, 4, 4, 4,4, 4, 4, 4, 4,4, 4, 4],
                                    pointHoverRadius: [2, 2, 2, 2, 2,2, 2, 2, 2, 2,2, 2, 2],
                                    pointBackgroundColor: ['#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)'],
                                    pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff',],
                                },{
                                  label: 'No. of Leads',
                                  data: lead_data,
                                  backgroundColor: saleGradientBg2,
                                  borderColor: [
                                      '#52CDFF',
                                  ],
                                  borderWidth: 1.5,
                                  fill: true, // 3: no fill
                                  pointBorderWidth: 1,
                                  pointRadius: [0, 0, 0, 4, 0],
                                  pointHoverRadius: [0, 0, 0, 2, 0],
                                  pointBackgroundColor: ['#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)'],
                                    pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff',],
                              }]
                            };
                        
                            var salesTopOptions = {
                              responsive: true,
                              maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display: true,
                                            drawBorder: false,
                                            color:"#F0F0F0",
                                            zeroLineColor: '#F0F0F0',
                                        },
                                        ticks: {
                                          beginAtZero: false,
                                          autoSkip: true,
                                          maxTicksLimit: 4,
                                          fontSize: 10,
                                          color:"#6B778C"
                                        }
                                    }],
                                    xAxes: [{
                                      gridLines: {
                                          display: false,
                                          drawBorder: false,
                                      },
                                      ticks: {
                                        beginAtZero: false,
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                        fontSize: 10,
                                        color:"#6B778C"
                                      }
                                  }],
                                },
                                legend:false,
                                legendCallback: function (chart) {
                                  var text = [];
                                  text.push('<div class="chartjs-legend"><ul>');
                                  for (var i = 0; i < chart.data.datasets.length; i++) {
                                    console.log(chart.data.datasets[i]); // see what's inside the obj.
                                    text.push('<li>');
                                    text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
                                    text.push(chart.data.datasets[i].label);
                                    text.push('</li>');
                                  }
                                  text.push('</ul></div>');
                                  return text.join("");
                                },
                                
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    }
                                },
                                tooltips: {
                                    backgroundColor: 'rgba(31, 59, 179, 1)',
                                }
                            }
                            var salesTop = new Chart(graphGradient, {
                                type: 'line',
                                data: salesTopData,
                                options: salesTopOptions
                            });
                            document.getElementById('performance-line-legend').innerHTML = salesTop.generateLegend();
                          }
                               
                    });

                    rpc.query({
                        model: "product",
                        method: "get_tickets_vs_leads",
                        args:[uid],    
                    })
                    .then(function (result) {

                        if ($("#marketingOverview").length) {
                            var ticket_labels = result.tickets_labels;
                            var ticket_data = result.tickets_dict;
                            var lead_data = result.leads_dict;
                            var total = result.total
                            if(!$('#leads_tickets_count_added').length){    
                                $('#leads_tickets_count').append('<span id="leads_tickets_count_added">' + total + '</span>');
                            }
                            
                            var marketingOverviewChart = document.getElementById("marketingOverview").getContext('2d');
                            var marketingOverviewData = {
                                labels: ticket_labels,
                                datasets: [{
                                    label: 'Feedback',
                                    data: ticket_data,
                                    backgroundColor: "#1F3BB3",
                                    borderColor: [
                                        '#1F3BB3',
                                    ],
                                    borderWidth: 0,
                                    fill: true, // 3: no fill
                                    
                                },{
                                label: 'Leads',
                                data: lead_data,
                                backgroundColor: "#52CDFF",
                                borderColor: [
                                    '#52CDFF',
                                    
                                ],
                                borderWidth: 0,
                                fill: true, // 3: no fill
                            }]
                            };
                        
                            var marketingOverviewOptions = {
                            responsive: true,
                            maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display: true,
                                            drawBorder: false,
                                            color:"#F0F0F0",
                                            zeroLineColor: '#F0F0F0',
                                        },
                                        ticks: {
                                        beginAtZero: true,
                                        autoSkip: true,
                                        maxTicksLimit: 5,
                                        fontSize: 10,
                                        color:"#6B778C"
                                        }
                                    }],
                                    xAxes: [{
                                    stacked: true,
                                    barPercentage: 0.35,
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                    },
                                    ticks: {
                                        beginAtZero: false,
                                        autoSkip: true,
                                        maxTicksLimit: 12,
                                        fontSize: 10,
                                        color:"#6B778C"
                                    }
                                }],
                                },
                                legend:false,
                                legendCallback: function (chart) {
                                var text = [];
                                text.push('<div class="chartjs-legend"><ul>');
                                for (var i = 0; i < chart.data.datasets.length; i++) {
                                    console.log(chart.data.datasets[i]); // see what's inside the obj.
                                    text.push('<li class="text-muted text-small">');
                                    text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
                                    text.push(chart.data.datasets[i].label);
                                    text.push('</li>');
                                }
                                text.push('</ul></div>');
                                return text.join("");
                                },
                                
                                elements: {
                                    line: {
                                        tension: 0.4,
                                    }
                                },
                                tooltips: {
                                    backgroundColor: 'rgba(31, 59, 179, 1)',
                                }
                            }
                            var marketingOverview = new Chart(marketingOverviewChart, {
                                type: 'bar',
                                data: marketingOverviewData,
                                options: marketingOverviewOptions
                            });
                            document.getElementById('marketing-overview-legend').innerHTML = marketingOverview.generateLegend();
                        }
                    });
                      


            });
        },

        format_currency: function (currency, amount) {
            if (typeof (amount) != 'number') {
                amount = parseFloat(amount);
            }
            var formatted_value = (parseInt(amount)).toLocaleString(currency.language, { minimumFractionDigits: 2 })
            if (currency.position === "after") {
                return formatted_value += ' ' + currency.symbol;
            } else {
                return currency.symbol + ' ' + formatted_value;
            }
        },

        willStart: function () {
            var self = this;
            self.drpdn_show = false;
            return Promise.all([ajax.loadLibs(this), this._super()]);
        },
    });
    core.action_registry.add('new_cep_dashboard', ActionMenu);
});
