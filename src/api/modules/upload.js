import $http from "@/utils/request.js";

export const photo = {
    // 新增图片
    save(data) {
        return $http.post(`rotation/pictures/save`,data)
    },
    // 通过id获取图片信息
    getbyid(id) {
        return $http.get(`rotation/pictures/info/${id}`)
    },
    // 获取全部
    getAll(page=1,limit=100) {
        return $http.get(`rotation/pictures/list?page=${page}&size=${limit}`)
    },
    // 删除图片
    delete(pictureArr) {
        return $http.post(`rotation/pictures/delete`,pictureArr)
    },
    // 修改图片
    update(data) {
        return $http.put(`rotation/pictures/update`,data)
    },
    // 获取播放速度
    getSpeed() {
        return $http.get(`rotation/pictures/getSpeed`)
    },
    // 修改播放速度
    updateSpeed(speed) {
        return $http.get(`rotation/pictures/set/${speed}`)
    }

} 

