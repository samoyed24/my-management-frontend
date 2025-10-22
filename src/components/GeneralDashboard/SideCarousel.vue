<script setup lang="ts">
import project1 from '@/assets/dashboard/project1.jpg'
import project2 from '@/assets/dashboard/project2.jpg'
import project3 from '@/assets/dashboard/project3.jpg'
import project4 from '@/assets/dashboard/project4.jpg'
import project5 from '@/assets/dashboard/project5.jpg'

const carouselList: string[] = [
    project1, project2, project3, project4, project5
]

</script>

<template>
    <custom-card>
        <template #default>
            <custom-carousel 
                :image-list="carouselList" 
                :height="'160px'" 
                :indicator-position="'none'" 
                :motion-blur="true" 
            />
        </template>
    </custom-card>
</template>