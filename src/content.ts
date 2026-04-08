import { runWorkflow } from './workflow'

function injectButton() {
  const btn = document.createElement('button')
  btn.innerText = '自動完成並送出'
  btn.style.position = 'fixed'
  btn.style.top = '20px'
  btn.style.right = '20px'
  btn.style.zIndex = '9999'

  btn.onclick = () => runWorkflow()

  document.body.appendChild(btn)

}
async function init() {
  console.log('[AutoSubmit] Ready')
  
  // UI
  injectButton();
  window.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      await runWorkflow()
    }
  })
}

init()
