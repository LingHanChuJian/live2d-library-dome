import { ref, watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import live2d, { Live2dOptions, Live2dReturn } from 'live2d-library'

export type Options = Omit<Live2dOptions, 'canvas'>

export const useLive2d = (options: Options) => {
    const canvasRef = ref<HTMLCanvasElement>()

    const states = ref<Live2dReturn>()

    watch(
        canvasRef,
        () => {
            const canvas = unrefElement(canvasRef)
            if (!canvas) { return }

            states.value = live2d(Object.assign(options, { canvas }))
        },
        { immediate: true }
    )

    return {
        states,
        canvasRef,
    }
}
