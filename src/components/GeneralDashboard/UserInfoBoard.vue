<script setup lang="ts">
import { useUserAuthStore } from '@/stores/auth'
import avatar from '@/assets/avatar.png'
import { ElMessage, ElNotification } from 'element-plus'
import { SignUpData } from 'types/dashboard'
import { postSignUp } from '@/api/dashboard'
import { APIError } from '@/api/wrapper'

export interface UserInfoBoardData {
    username: string
    role: string
    greetings: string
    registerDay: number
    signUp: {
        loading: boolean
        doneToday: boolean
        rank?: number
    },
    wordOfWisdom?: string
}
const userInfoBoardData = ref<UserInfoBoardData>()

const user: UserStoreData = useUserAuthStore().getUser()

const getCurrentHour: () => number = () => {
    const nowDate = new Date()
    return nowDate.getHours()
}

const getGreetings = () => {
    const hour: number = getCurrentHour()
    let timeType: string
    if (hour >= 0 && hour < 6) {
        timeType = '凌晨好'
    } else if (hour >= 6 && hour < 12) {
        timeType = '早上好'
    } else if (hour == 12) {
        timeType = '中午好'
    } else if (hour > 12 && hour < 18) {
        timeType = '下午好'
    } else {
        timeType = '晚上好'
    }
    return `${timeType}，${user.username}`
}

const getUserInfoBoardData = () => {
    userInfoBoardData.value = {
        username: user.username,
        role: user.role,
        greetings: getGreetings(),
        registerDay: 7,
        signUp: {
            loading: false,
            doneToday: false, // TODO 这几项用Mock模拟一下
            rank: 0,
        },
        wordOfWisdom: '“一个人可以被毁灭，但不能被打败。真正的坚强不是没有恐惧，而是带着恐惧仍然前行。” —— 海明威'
    }
}

getUserInfoBoardData()

const fetchSignUp: () => Promise<void>  = async () => {
    ElNotification.info('正在签到中...')
    userInfoBoardData.value!.signUp.loading = true
    try {
        const { data } = await postSignUp()
        userInfoBoardData.value!.signUp.doneToday = true
        userInfoBoardData.value!.signUp.rank = data?.rank
        ElNotification.success(`签到成功，今日签到排名: ${data?.rank}`)
    } catch(err: unknown) {
        const error = err as APIError
        ElNotification.error(`签到失败: ${error.errMsg}`)
    } finally {
        userInfoBoardData.value!.signUp.loading = false
    }
}

</script>

<template>
    <custom-card :header="{ text: getGreetings() }">
        <div class="avatar-zone center">
            <el-avatar shape="square" :src="avatar" id="avatar" />
            {{ user.username }}
            <div class="small-gray-text">
                今天是您加入本站的第 {{ userInfoBoardData?.registerDay }} 天
            </div>
            <el-button 
                type="primary" 
                :style="{ width: '100%', marginTop: '20px' }" 
                :loading="userInfoBoardData?.signUp.loading"
                :disabled="userInfoBoardData?.signUp.doneToday" 
                @click="fetchSignUp"
            >
                <span v-if="userInfoBoardData?.signUp.rank">
                    您已签到，今日签到排名: {{ userInfoBoardData?.signUp.rank }}
                </span>
                <span v-else>
                    签到
                </span>
            </el-button>
        </div>
        <template #footer v-if="userInfoBoardData?.wordOfWisdom">
            <span class="small-gray-text">
                {{ userInfoBoardData.wordOfWisdom }}
            </span>
        </template>
    </custom-card>
</template>

<style scoped>
.avatar-zone {
    flex-direction: column;
}
#avatar {
    margin: 10px;
}
</style>