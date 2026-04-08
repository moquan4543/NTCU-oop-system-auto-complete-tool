export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

export function click(selector: string) {
    const el = document.querySelector(selector) as HTMLElement
    el?.click()
}

export function isDisabled(selector: string) {
    const el = document.querySelector(selector) as HTMLButtonElement
    return !el || el.disabled
}
export async function handleModalConfirm(timeout = 10000) {
  const start = Date.now()

  while (Date.now() - start < timeout) {
    // 找所有 button
    const buttons = Array.from(document.querySelectorAll('button'))

    const confirmBtn = buttons.find(btn => {
      const text = btn.textContent?.trim()
      return text === '確定' || text === 'OK' || text === '確認'
    })

    if (confirmBtn) {
      console.log('[AutoSubmit] Modal confirm detected')
      confirmBtn.click()
      return true
    }

    await sleep(200)
  }

  return false
}
export async function waitForGenerateComplete(
  selector: string,
  timeout = 10000
) {
  const start = Date.now()

  const getBtn = () =>
    document.querySelector(selector) as HTMLButtonElement | null

  // 1️⃣ 等進入 loading（disabled = true）
  while (true) {
    const btn = getBtn()
    if (!btn) throw new Error('Generate button not found')

    if (btn.disabled) break

    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for generate start')
    }

    await sleep(100)
  }

  while (true) {
    const btn = getBtn()
    if (!btn) throw new Error('Generate button lost')

    const text = btn.textContent?.trim()

    if (!btn.disabled && text === '產生新步驟') {
      return
    }

    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for generate complete')
    }

    await sleep(150)
  }
}
