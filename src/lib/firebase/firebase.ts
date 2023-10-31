import { initializeApp, FirebaseApp, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

export default class FireBaseService{
    fbApp: FirebaseApp
    storageInstance!: ReturnType<typeof getStorage>

    constructor(fbConfig: Record<string, string>){
        this.fbApp = initializeApp(fbConfig)
        console.log('Firebase initialized')
        // this.fbApp = getApp()
        this.getStorageInstance()
    }

    getStorageInstance(bucketLink?: string) {
        this.storageInstance = getStorage(this.fbApp)
    }

    async uploadFile(object: Record<string, any | unknown>, mediaType: string | 'VIDEO' | 'AUDIO' | 'IMAGS') {
        // const 
        return new Promise((resolve: (value: unknown) => void, reject: (error: unknown) => void) => {
            resolve({})
        })
    }

}


