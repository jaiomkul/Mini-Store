class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some fiels for category

    const removeFields = ["keyword", "page", "limit", "pagesize"];

    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter Price and others
    console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
  }

  pagination(pagesize) {
    const page = Number(this.queryStr.page) || 1;
    // const pagesize = req.query.pagesize || 12;
    // const pagesize = req.query.pagesize && 12;
    // const pagesize  = 10 && 12 // undefind;
    // const pagesize  = 12 && 12 // undefind; data(true )output

    // if page 1 then data should be from 1 to 12;
    // if page 1 then data should be from 13 to 24;

    const skip = (page - 1) * pagesize; // 1-1 =0, 0*anything = 0;
    this.query = this.query.skip(skip).limit(pagesize);
    return this;
  }
}
module.exports = ApiFeatures;
