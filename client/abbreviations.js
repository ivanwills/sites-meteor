
Template.abbreviations.abbreviation = function () {
    console.log(db.abbreviations.find(filter_query(), sort_order).count());
    return db.abbreviations.find(filter_query(), sort_order);
}
Template.abbreviations.abbreviation = function () {
    console.log(this);
    return this.abbreviation;
}
