import { Query } from "mongoose";

class QueryBuilder<T> {
   public queryModel: Query<T[], T>;
   public query: Record<string, unknown>;

   constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
      this.queryModel = queryModel;
      this.query = query;
   }

   search(searchableFields: string[]) {
      const searchTerm = this?.query?.search;
      if (searchTerm) {
         this.queryModel = this.queryModel.find({
            $or: searchableFields.map((field) => ({
               [field]: { $regex: searchTerm, $options: "i" },
            })),
         });
      }

      return this;
   }
   filter() {
      const filterObj = { ...this.query };
      const excludedFields = ["search", "sortBy", "sortOrder"];
      excludedFields.forEach((el) => delete filterObj[el]);
      this.queryModel = this.queryModel.find(filterObj);
      return this;
   }
   sort() {
      const sortBy = this.query?.sortBy
         ? (this.query.sortBy as string)
         : "createdAt";

      const sortOrder = this.query?.sortOrder === "asc" ? "" : "-";
      this.queryModel = this.queryModel.sort(`${sortOrder}${sortBy}`);
      return this;
   }
}

export default QueryBuilder;
