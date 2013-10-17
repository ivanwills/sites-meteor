
Template.abbreviations.abbreviation = function () {
    console.log(db.abbreviations.find(filter_query()).count());
    return db.abbreviations.find(filter_query());
}
Template.abbreviations.abbreviation = function () {
    console.log(this);
    return this.abbreviation;
}
