Meteor.subscribe('config');
Meteor.subscribe('environments');
Meteor.subscribe('groups');
Meteor.subscribe('abbreviations');
db = {
    config       : new Meteor.Collection("config"),
    environments : new Meteor.Collection("environments"),
    groups       : new Meteor.Collection("groups"),
    abbreviations : new Meteor.Collection("abbreviations")
};

visible_environments = function() {
    var count = 0;
    db.environments.find(filter_query(), sort_order).forEach( function(env) {
        var key = env_key(env.name);
        var value = ReactiveLocal.get(key);
        if ( value === true ) count++;
        else if (value !== false ) ReactiveLocal.set(key, false);
    });
    return count;
};

env_key = function(env) {
    var filter = ReactiveLocal.get("filter");
    if (!filter || filter == 'All') filter = null;
    return 'env.' + ( filter ? filter + '.' : '' ) + env;
};

filter_query = function() {
    var filter = ReactiveLocal.get("filter");
    if (filter == 'All') filter = null;
    return filter ? { "filter" : filter } : {};
};
sort_order = { sort : { order : 1 } };

Template.group_data.loggedin = function () {
    return Meteor.userId();
};

Template.title.title = function () {
    var title = db.config.findOne({name : "title"});
    return title ? title.value : 'Sites';
};

Template.filter.selected = Template.filter_option.selected = function (all) {
    return this.filters ? 'selected' : null;
};

Template.filter.filters = function () {
    var filter = db.config.findOne({"name" : "filters" });
    return filter && filter.value ? filter.value : false;
};

Template.filter.events({
    'change select' : function (evt, tmpl) {
        ReactiveLocal.set("filter", $('#filter').val() );
    }
});

Template.footer.copyright = function () {
    var title = db.config.findOne({name : "copyright"});
    return title ? title.value : 'Ivan Wills 2013';
};

Template.show.environments = Template.table.environment = function () {
    return db.environments.find(filter_query(), sort_order);
};

Template.show_env.state = function () {
    var key = env_key(this.name);
    return ReactiveLocal.get(key) ? 'hidden' : '';
};

Template.show_env.action = function () {
    var key = env_key(this.name);
    return ReactiveLocal.get(key) ? 'Hide' : 'Show';
};

Template.show_env.events({
    'click th' : function (evt, tmpl) {
        var key = env_key(this.name);
        ReactiveLocal.set(key, ReactiveLocal.get(key) ? false : true );
    }
});

Template.links.links = function () {
    if ( this.links && this.links.length )
        this.links[ this.links.length - 1 ].last = true;
    return this.links;
};

Template.links.pipe = function () {
    return this.last ? '' : '|';
};

var json_edit;
Template.edit.events({
    'click a' : function (evt, tmpl) {
        evt.stopPropagation();
        console.log('edit', tmpl.data);
        var edit = $('#edit');

        if (json_edit) {
            // Clear any previous data
            json_edit.jsonEdit('clear');
        }
        json_edit = edit;

        edit.jsonEdit({json : tmpl.data, max_depth : 3, edit : true });

        return false;
    }
});

