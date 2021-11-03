window.pagination = renderPagination;

export const pageService = {
    setLength,
    setPageSize: setItemsPerPage,
    render: renderPagination,
}

var paginationLength = 10;
var itemsPerPage = 5;

const id = 'pagination';
if (!document.getElementById(id)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './css/pagination.css';
    link.media = 'all';
    head.appendChild(link);
}

function setLength(length) {
    paginationLength = length;
}

function setItemsPerPage(num) {
    itemsPerPage = num;
}

function renderPagination(index = 1, length = paginationLength, size = itemsPerPage) {
    const page = {
        start() {
            const SIZE = Math.floor(size / 2);
            const LIMIT = SIZE - Math.min(0, (length - index - 1) - Math.floor(size / 2));
            return Math.max(0, index - LIMIT);
        },
        end() {
            const SIZE = Math.floor(size / 2) + Math.max(0, Math.floor(size / 2) - index);
            const LIMIT = Math.min(length - 1 - index, SIZE);
            return index + LIMIT;
        },
        previous: (index > 0) ? index - 1 : null,
        next: (length > 0 && index < length - 1) ? index + 1 : null,
    }
    var strHtml = '';
    strHtml += (page.previous < index) ? `<button onclick="onPaginationClick(${page.previous})"> « </button>` : `<button class="pgndisabled"> « </button>`;
    for (var i = page.start(); i <= page.end(); i++) {
        strHtml += `<button ${(i === index) ? 'class="pgnactive"' : ''}onclick="onPaginationClick(${i})"> ${i + 1} </button>`
    }
    strHtml += (page.next) ? `<button onclick="onPaginationClick(${page.next})"> » </button>` : `<button class="pgndisabled"> » </button>`;
    document.querySelector('.pagination-navigator').innerHTML = strHtml;
}

