class PaginationModel {
  /**
   * 默认分页数
   */
  static defaultPage = 1;
  /**
   * 默认分页条数
   */
  static defaultSize = 20;
  /**
   * 默认分页参数配置
   */
  static defaultPager() {
    return {
      total: 0,
      rows: [],
      page: this.defaultPage,
      size: this.defaultSize,
    };
  }
  /**
   * 分页数据返回体
   */
  static pagination(pager = {}) {
    const pagerModel = Object.assign({}, this.defaultPager(), pager);
    return pagerModel;
  }
}
module.exports = PaginationModel;
