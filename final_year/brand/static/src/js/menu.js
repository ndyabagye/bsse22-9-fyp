/** @odoo-module **/

    
import { registry } from "@web/core/registry";
import { UserMenu } from "@web/webclient/user_menu/user_menu";
import { patch } from 'web.utils';

const userMenuRegistry = registry.category("user_menuitems");

patch(UserMenu.prototype, "new_my_component", {
    getElements() {
        userMenuRegistry.remove("documentation");
        userMenuRegistry.remove("support");
        userMenuRegistry.remove("odoo_account");
        const sortedItems = userMenuRegistry
              .getAll()
            .map((element) => element(this.env))
            .sort((x, y) => {
                const xSeq = x.sequence ? x.sequence : 100;
                const ySeq = y.sequence ? y.sequence : 100;
                return xSeq - ySeq;
            });
        return sortedItems;
    }

});  
