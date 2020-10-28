import React from 'react'

const Notification = ({ noti }) => {
	if (!noti) return null

	return <div className='noti'>{noti}</div>
}

export default Notification
