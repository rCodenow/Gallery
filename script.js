const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 根据暗黑模式设置自动切换样式
if (prefersDarkMode) {
    document.body.classList.toggle('dark-mode');
}
document.addEventListener('DOMContentLoaded', function () {


    const openExtensionBtn = document.getElementById('openExtension');

    if (window.opener) {
        openExtensionBtn.textContent = '添加扩展';
    } else {
        openExtensionBtn.textContent = '打开页面';
    }

    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filePath = window.location.href + this.getAttribute('data-copy');

            navigator.clipboard.writeText(filePath)
                .then(() => {
                    alert('已复制文件链接到剪贴板！');
                })
                .catch(error => {
                    console.error('复制文件链接失败:', error);
                });
        });
    });

    const openNewButtons = document.querySelectorAll('[start]');

    openNewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filePath = this.getAttribute('start');
            const fileLink = document.createElement('a');
            fileLink.href = 'http://rc.40code.com/editor?extension=' + window.location.href + filePath;
            fileLink.target = '_blank';
            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);
        });
    });

    const darkModeToggle = document.getElementById('darkModeToggle');

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });

    const addToggle = document.getElementById('addToggle');

    addToggle.addEventListener('click', function () {
        window.open('https://github.com/rCodenow/Gallery/pull')
    });

    const seeToggle = document.getElementById('seeToggle');

    seeToggle.addEventListener('click', function () {
        window.open('./from.html')
    });
    // 获取所有标签元素
    const tags = document.querySelectorAll('.tag');

    // 为每个标签添加点击事件处理程序
    tags.forEach(tag => {
        tag.addEventListener('click', function () {
            const selectedTag = this.dataset.tag; // 获取点击的标签值
            if (selectedTag === '所有') {
                // 移除之前的活动标签样式
                const activeTag = document.querySelector('.tag.active');
                if (activeTag) {
                    activeTag.classList.remove('active');
                }

                // 添加活动标签样式到当前点击的标签
                this.classList.add('active');
                showAllExtensions(); // 显示所有扩展项
            } else {
                // 移除之前的活动标签样式
                const activeTag = document.querySelector('.tag.active');
                if (activeTag) {
                    activeTag.classList.remove('active');
                }

                // 添加活动标签样式到当前点击的标签
                this.classList.add('active');

                searchByTag(selectedTag); // 根据标签进行搜索
            }
        });

    });

    // 获取搜索输入框元素
    const searchInput = document.querySelector('#searchInput');

    // 监听搜索输入框的输入事件
    searchInput.addEventListener('input', function (event) {
        const searchText = this.value.toLowerCase().trim(); // 获取搜索输入的文本并转换为小写
        searchByText(searchText); // 根据文本进行搜索
    });

    // 标签搜索函数
    function searchByTag(tag) {
        const extensions = document.querySelectorAll('.extension'); // 获取所有扩展项

        extensions.forEach(extension => {
            const extensionTags = extension.dataset.tags; // 获取扩展项的标签值
            if (extensionTags.includes(tag)) {
                extension.style.display = 'block'; // 显示包含指定标签的扩展项
            } else {
                extension.style.display = 'none'; // 隐藏不包含指定标签的扩展项
            }
        });
    }

    // 文本搜索函数
    function searchByText(text) {
        const extensions = document.querySelectorAll('.extension'); // 获取所有扩展项

        extensions.forEach(extension => {
            const extensionName = extension.querySelector('p').textContent.toLowerCase(); // 获取扩展项的名称并转换为小写
            const extensionTags = extension.dataset.tags; // 获取扩展项的标签值

            if (extensionName.includes(text) || extensionTags.includes(text)) {
                extension.style.display = 'block'; // 显示匹配搜索文本的扩展项
            } else {
                extension.style.display = 'none'; // 隐藏不匹配搜索文本的扩展项
            }
        });
    }

    // 显示所有扩展项
    function showAllExtensions() {
        const extensions = document.querySelectorAll('.extension'); // 获取所有扩展项

        extensions.forEach(extension => {
            extension.style.display = 'block'; // 显示所有扩展项
        });
    }
});
