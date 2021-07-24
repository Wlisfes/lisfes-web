import { DateInterface, NodeUserResponse } from '@/types'

export interface NodeRoleResponse extends DateInterface {
	id: number
	primary: string
	name: string
	status: number
	type: number
	comment: string
	children: NodeRoleResponse[]
}

/**角色列表-Parameter*************************************************/
export interface NodeRolesParameter {
	page: number
	size: number
}
/**角色列表-Respone**/
export interface NodeRolesRespone extends NodeRolesParameter {
	total: number
	list: NodeRoleResponse[]
}

/**角色信息-Parameter*************************************************/
export interface NodeRoleParameter {
	id: number
}

/**用户角色信息-Respone*********************************************/
export interface NodeUserRoleRespone extends NodeRoleResponse {
	user: NodeUserResponse
}

/**角色信息-uid-Parameter*************************************************/
export interface NodeUserUidRoleParameter {
	uid: number
}

/**用户角色信息-uid-Respone*********************************************/
export interface NodeUserUidRoleRespone extends NodeRoleResponse {
	user: NodeUserResponse
}

/**修改角色权限-Parameter*************************************************/
export interface UpdateNodeRoleParameter {
	id: number
	status: number
	comment: string
	role: number[]
}
/**修改角色权限-Respone**/
export interface UpdateNodeRoleRespone {
	message: string
}

/**切换角色状态-Parameter*************************************************/
export interface NodeRoleCutoverParameter {
	id: number
}
/**切换角色状态-Respone**/
export interface NodeRoleCutoverRespone {
	message: string
}
