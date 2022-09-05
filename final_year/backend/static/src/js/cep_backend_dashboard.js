odoo.define('CepDashboard.CepDashboard', function (require) {
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

    function getID(id) {
        console.log("1")
    }

    var ActionMenu = AbstractAction.extend({
        contentTemplate: 'Ticketdashboard',
        events: {
            'click #team_name':
                function () {
                    var team_id = document.getElementById('team_id').value
                    console.log("================")
                    console.log(team_id)
                    this.do_action('helpdesk_mgmt.action_helpdesk_ticket_kanban_from_dashboard', {
                        additional_context: { 'active_id': 1 },
                    });
                },
            'click #team_submit': function () {
                const queryString = window.location.search;
                console.log(queryString)
                const urlParams = new URLSearchParams(queryString);
                const team_id = urlParams.get('team_id')
                console.log(team_id);

            }
        },
        display_team_tickets: function (ev) {
            var self = this;
            var posted = false
            self._rpc({
                route: '/web/action/load',
                params: {
                    action_id: "helpdesk_mgmt.action_helpdesk_ticket_kanban_from_dashboard",
                    additional_context: {
                        'active_id': 1,
                    }
                }

            }).then(function (result) {
                // self.do_action({
                console.log(result)
                return self.do_action(result);
                // res_model: 'helpdesk.ticket',
                // name: _t('CEP Ticket'),
                // view_mode: "kanban,tree,form",
                // views: [[false, 'list'], [false, 'form']],
                // type: 'ir.actions.act_window',
                // domain: [("team_id", "=", 1)],
                // });
            })

        },
        // init: function (parent, context) {

        //     this._super(parent, context);
        //     this.company_teams = [];

        // },
        willStart: function () {
            var self = this;
            self.drpdn_show = false;
            self.my_teams = "nnnnn";
            return Promise.all([ajax.loadLibs(this), this._super()]).then(function () {
                return self.fetch_data();
            });;
        },

        fetch_data: function (model) {
            var self = this;
            var teams = this._rpc({
                model: "helpdesk.ticket.team",
                method: "get_teams",
            }).then(function (result) {

                console.log(JSON.parse(result))
                self.my_teams = JSON.parse(result)

            });
            ;
            return $.when(teams);
        },

    })


    core.action_registry.add('cep_dashboard', ActionMenu);
    return ActionMenu;

})