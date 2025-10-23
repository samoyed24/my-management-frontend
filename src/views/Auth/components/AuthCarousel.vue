<script setup lang="ts">
import Carousel1 from '@/assets/auth/carousel-1.jpg'
import Carousel2 from '@/assets/auth/carousel-2.jpg'
import Carousel3 from '@/assets/auth/carousel-3.jpg'

const carouselList = ref<string[]>([
    Carousel1, Carousel2, Carousel3
])

</script>

<template>
    <custom-carousel :image-list="carouselList" :height="'100%'" />
</template>