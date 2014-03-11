
Template.table.group = function () {
    return db.groups.find(filter_query(), sort_order);
};

Template.group_env.state = Template.env_head.state = function () {
    var key = env_key(this.name);
    return ReactiveLocal.get(key) ? '' : 'hidden';
};

Template.env_head.action = function () {
    var key = env_key(this.name);
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.env_head.events({
    'click th' : function (evt, tmpl) {
        var key = env_key(this.name);
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group.colspan = function () {
    return 1 + visible_environments();
};

Template.group.group = function () {
    for ( var i in this.data ) {
        this.data[i].group = this.name;
    }
    return this.data;
};

group_key = function(env) {
    var filter = ReactiveLocal.get("filter");
    if (!filter || filter == 'All') filter = null;
    return 'group.' + ( filter ? filter + '.' : '' ) + env;
};


Template.group.state = function () {
    var key = group_key(this.name);
    return ReactiveLocal.get(key) ? 'open' : 'closed';
};

Template.group.action = function () {
    var key = group_key(this.name);
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.group.events({
    'click th' : function (evt, tmpl) {
        var key = group_key(this.name);
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.group_data.display = function () {
    var key = group_key(this.group);
    return ReactiveLocal.get(key) ? '' : 'hidden';
};

Template.group_data.environment = function () {
    var self = this;
    var envs = [];
    db.environments.find(filter_query(), sort_order).forEach(function(env) {
        var data =  self.environments[env.name] || {} ;
        data.name = env.name;
        envs.push(data);
    });
    return envs;
};

