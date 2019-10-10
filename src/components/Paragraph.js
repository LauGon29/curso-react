import React from 'react'

export default props => <p className="description" dangerouslySetInnerHTML={{ __html: props.description }} />