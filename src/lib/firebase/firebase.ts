import { initializeApp, FirebaseApp, getApp,  } from 'firebase/app'
import { getStorage } from 'firebase/storage'

export default class FireBaseService{
    fbApp: FirebaseApp

    constructor(fbConfig: Record<string, string>){
        this.fbApp = initializeApp(fbConfig)
        console.log('Firebase initialized')
        // this.fbApp = getApp()
    }

    getStorageInstance(bucketLink?: string) {
        return getStorage(this.fbApp)
    }

}


