import request from '@/utils/request'

export function getSignalsTable() {
  return request({
    url: 'User/getAllUser',
    method: 'get'

  })
}

// export function creatSignals(data) {
//   return request({
//     url: '/v1/signals',
//     method: 'post',
//     data
//   })
// }

// export function updateTafsilsAsset(data, id) {
//   return request({
//     url: `/v1/tafsils/currentasset/${id}`,
//     method: 'post',
//     data
//   })
// }

// export function deleteSignals(data, id) {
//   return request({
//     url: `/v1/signals/${id}`,
//     method: 'post',
//     data

//   })
// }
