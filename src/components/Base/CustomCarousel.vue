<script setup lang="ts">

// const carouselList = ref<string[]>([
//     Carousel1, Carousel2, Carousel3
// ])
export interface CustomCarouselProps {
    imageList: string[]
    height?: string
    motionBlur?: boolean
    indicatorPosition?: '' | 'none' | 'outside'
}
const props = defineProps<CustomCarouselProps>()

</script>

<template>
    <el-carousel class="full" :height="props.height" :motion-blur="motionBlur" :indicator-position="indicatorPosition">
        <el-carousel-item v-for="carousel in imageList" class="center">
            <el-image :src="carousel" fit="cover" class="full" />
        </el-carousel-item>
    </el-carousel>
</template>

<style lang="css" scoped>
</style>