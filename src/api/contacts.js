import request from '@/utils/request'

export function getContactsTable(id) {
  console.log(id)
  return request({
    url: `/User/ShowUserContacts/${id}`,
    method: 'get'

  })
}
// /api/User/ShowUserContacts/
export function creatContacts(data) {
  return request({
    url: '/User/addNewContact',
    method: 'post',
    data
  })
}

export function updateContact(data) {
  return request({
    url: '/User/UpdateContact/',
    method: 'post',
    data
  })
}

export function deleteContact(id) {
  return request({
    url: `/User/RemoveContact/${id}`,
    method: 'GET'

  })
}
