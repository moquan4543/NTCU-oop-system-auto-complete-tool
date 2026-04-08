import { sleep, click, isDisabled, handleModalConfirm, waitForGenerateComplete } from './utils'

export async function runWorkflow() {
  await generateSteps()
  await completeGuide()
  await acceptGuide()
  await reflection()
  await submit()
}

async function generateSteps() {
  click('#btn-generate-step')
  await sleep(300) 
  await waitForGenerateComplete('#btn-generate-step')
}

async function completeGuide() {
  while (true) {
    click('input[value="understand"]')

    if (isDisabled('#btn-next')) break

    click('#btn-next')
    await sleep(300)
  }
}

async function acceptGuide() {
  click('#chk-accept-step')
  click('input[value="logic_clear"]')
  await sleep(200)
  click('#btn-save-accept-other')
}

async function reflection() {
  click('#btn-reflection')
  await sleep(500)

  while (true) {
    document.querySelectorAll('.rq-dot input[value="5"]')
      .forEach(el => (el as HTMLInputElement).click())

    const next = document.querySelector('.rq-nav-button:last-child') as HTMLButtonElement

    if (!next || next.disabled) break

    next.click()
    await sleep(200)
  }

  click('#btn-reflection-save')
  await handleModalConfirm()
}

async function setCode(code: string) {
  const win = window as any

  for (let i = 0; i < 10; i++) {
    if (win.monaco?.editor) {
      const model = win.monaco.editor.getModels()[0]
      model.setValue(code)
      return
    }
    await sleep(300)
  }

  throw new Error('Monaco not found')
}

async function submit() {
  click('#btn-save-submit')
}
