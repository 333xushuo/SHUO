const pages = document.querySelectorAll('.question-page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const quizForm = document.getElementById('quizForm');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');

let currentPage = 0;

// 显示当前页面，隐藏其他页面
function showPage(pageIndex) {
  pages.forEach((page, index) => {
    page.style.display = index === pageIndex ? 'block' : 'none';
  });

  // 更新按钮状态
  prevBtn.disabled = pageIndex === 0;
  nextBtn.style.display = pageIndex === pages.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = pageIndex === pages.length - 1 ? 'inline-block' : 'none';
}

// 点击“上一题”按钮
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage -= 1;
    showPage(currentPage);
  }
});

// 点击“下一题”按钮
nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    currentPage += 1;
    showPage(currentPage);
  }
});

// 提交表单
quizForm.addEventListener('submit', (event) => {
  event.preventDefault(); // 阻止默认提交行为

  // 收集用户答案
  const formData = new FormData(quizForm);
  const answers = {};
  formData.forEach((value, key) => {
    answers[key] = value;
  });

  // 展示结果
  resultContent.innerHTML = `
    <h3>感谢参与！</h3>
    <p>您的回答已提交。答案如下：</p >
    <pre>${JSON.stringify(answers, null, 2)}</pre>
  `;

  // 隐藏测试表单，显示结果
  quizForm.style.display = 'none';
  resultSection.style.display = 'block';
});

// 初始化显示第一页
showPage(currentPage);
