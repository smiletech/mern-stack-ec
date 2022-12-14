const myPagination = (array, page = 1, limit = 10)=> {
    if( !Array.isArray(array) ) {
      throw `Expect array and got ${typeof array}`;
    }
    page = page <= 0 ? 1 : page;
    limit = page <= 0 ? 1 : limit;
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    const offset = (page - 1) * perPage;
    const paginatedItems = array.slice(offset, offset + perPage);
    const totalPages = Math.ceil(array.length / perPage);
  
    return {
      currentPage,
      perPage,
      total: array.length,
      hasNextPage: currentPage  < totalPages,
      hasPrevPage: currentPage > 1,
      totalPages,
      docs: paginatedItems
    };
  }
  
  module.exports = myPagination;