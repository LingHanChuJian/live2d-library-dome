<template>
    <a-card class="sider">
        <a-card>
            <div>缩放</div>
            <a-slider v-model:value="viewScale" :min="0" :max="4" :step="0.01" @change="handleChange"></a-slider>
        </a-card>
        <a-card>
            <div>切换模型</div>
            <a-button type="primary" block @click="handleClick">切换下一个模型</a-button>
        </a-card>
    </a-card>
    <a-layout style="height: 100%;">
        <a-layout-content>
            <canvas ref="canvasRef" :width="width" :height="height"></canvas>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import { useLive2d } from './useLive2d'
import { ref, onBeforeUnmount } from 'vue'

const viewScale = ref(1)

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

const { canvasRef, states } = useLive2d({
    models: ['../models/Tokisaki_Kurumi/model0.json', '../models/Tokisaki_Kurumi2/model0.json']
})

const handleChange = () => {
    states.value?.setScale(viewScale.value)
}

const handleClick = () => {
    states.value?.nextModel()
}

onBeforeUnmount(() => {
    states.value?.release()
})
</script>

<style>
:root {
    --sider-width: 400px;
}

html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#app {
    height: 100vh;
}

.sider {
    min-width: var(--sider-width);
    max-width: var(--sider-width);
    width: var(--sider-width);
    position: fixed;
    display: inline-block;
}

div {
    font-size: 20px;
}
</style>
