import { runWorkflow } from './workflow'

async function init() {
  console.log('[AutoSubmit] Ready')

  // 測試用（你可以改成 UI trigger）
  window.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      await runWorkflow()
    }
  })
}

init()
