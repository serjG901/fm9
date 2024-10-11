export default function calculatePaginationRenderPage(
    pageActiveRender: number,
    pages: number
  ): (number | string)[] {
    let renderPages: (number | string)[] = [];
    switch (pageActiveRender) {
      case 1:
        renderPages = [
          [1, 2],
          [1, 2, 3],
          [1, 2, "..", pages],
        ][pages > 3 ? 2 : pages - 2];
        break;
      case 2:
        renderPages = [
          [1, 2],
          [1, 2, 3],
          [1, 2, 3, 4],
          [1, 2, 3, "..", pages],
        ][pages > 4 ? 3 : pages - 2];
        break;
  
      case 3:
        renderPages = [
          [1, 2, 3],
          [1, 2, 3, 4],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, "..", pages],
        ][pages > 5 ? 3 : pages - 3];
        break;
  
      default:
        renderPages = [
          [1, "..", pages - 1, pages],
          [1, "..", pages - 2, pages - 1, pages],
          [1, "..", pages - 3, pages - 2, pages - 1, pages],
          [
            1,
            "..",
            pageActiveRender - 1,
            pageActiveRender,
            pageActiveRender + 1,
            "..",
            pages,
          ],
        ][pages - pageActiveRender > 3 ? 3 : pages - pageActiveRender];
    }
    return renderPages;
  }