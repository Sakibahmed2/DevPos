class QueryBuilder {
  constructor(moduleQuery, query) {
    this.moduleQuery = moduleQuery;
    this.query = query;
  }

  search(searchableFields) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.moduleQuery = this.moduleQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.moduleQuery = this.moduleQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortBy = this.query.sort
      ? this.query.sort.split(",").join(" ")
      : "-createdAt";

    this.moduleQuery = this.moduleQuery.sort(sortBy);
    return this;
  }

  paginate() {
    const page = parseInt(this.query.page, 10) || 1;
    const limit = parseInt(this.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.moduleQuery = this.moduleQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;
