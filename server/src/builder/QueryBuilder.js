class QueryBuilder {
  constructor(moduleQuery, query) {
    this.moduleQuery = moduleQuery;
    this.query = query;
  }

  search(searchableFields) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      // Map over searchable fields and apply regex only for strings
      this.moduleQuery = this.moduleQuery.find({
        $or: searchableFields.map((field) => {
          // Handle nested fields like "productInfo.category"
          const fieldPath = field.includes(".") ? `${field}.name` : field;

          // Use regex only on fields likely to be strings
          return {
            [fieldPath]: {
              $regex: searchTerm,
              $options: "i",
            },
          };
        }),
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

  async countTotal() {
    const totalQueries = this.moduleQuery.getFilter();
    const total = await this.moduleQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 5;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
