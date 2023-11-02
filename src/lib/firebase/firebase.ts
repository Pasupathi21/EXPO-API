import { initializeApp, FirebaseApp, getApp, } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

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

    async uploadFile(object: Record<string, any | unknown>, fileType: string | 'VIDEO' | 'AUDIO' | 'IMAGS' | 'DOC') {
        const meta_data = {
            contentType: object?.mimetype
        } 
        
        return new Promise(async (resolve: (value: unknown) => void, reject: (error: unknown) => void) => {
            try{
                let hierarchyFolder = 'EXPO/'
                if(fileType === 'VIDEO'){
                    hierarchyFolder += `videos/${object?.name}`
                    const videoStorageRef = ref(this.storageInstance, hierarchyFolder)
                    const uploadTask = await uploadBytes(videoStorageRef, object?.data, meta_data)
                    resolve(uploadTask)
                }else if (fileType){
                    hierarchyFolder += `audios/${object?.name}`
                    const audioStorageRef = ref(this.storageInstance, hierarchyFolder)
                    const uploadTask = await uploadBytes(audioStorageRef, object?.data, meta_data)
                    resolve(uploadTask)
                }else {
                    hierarchyFolder += `images/${object?.name}`
                    const imageStorageRef = ref(this.storageInstance, hierarchyFolder)
                    const uploadTask = await uploadBytes(imageStorageRef, object?.data, meta_data)
                    resolve(uploadTask)
                }
            }catch(e){
                console.log('ERROR', e)
               reject({
                message: 'Upload failed'
               }) 
            }
            
        })
    }

}


