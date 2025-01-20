export enum UserType {
  Member = 'member',
  Author = 'author',
  CMS = 'cms',
}

export enum Language {
  EN = 'en',
  AR = 'ar',
}

export enum PermissionsEnum {
  ADD_BOOK = 'add_book',
  UPDATE_BOOK = 'update_book',
  DELETE_BOOK = 'delete_book',
  PUBLISH_BOOK = 'publish_book',
  UNPUBLISH_BOOK = 'unpublish_book',
  APPROVE_BOOK_REQUEST = 'approve_book_request',
  REJECT_BOOK_REQUEST = 'reject_book_request',

  
  PAGINATE_BOOKS = 'paginate_books', 


  ADD_AUTHOR = 'add_author', 
  DELETE_AUTHOR = 'delete_author',
  REGENERATE_AUTHOR_PIN = 'regenerate_author_pin', 

  PAGINATE_AUTHORS = 'paginate_authors',

  CREATE_CMS_USER = 'create_cms_user',
  ASSIGN_ROLES = 'assign_roles', 
  CREATE_ROLE = 'create_role',

  PAGINATE_CMS_USERS = 'paginate_cms_users',

  MANAGE_BRANCHES = 'manage_branches',


  DISTRIBUTE_BOOKS = 'distribute_books',


  VIEW_DASHBOARD = 'view_dashboard',
  VIEW_BOOK_STATISTICS = 'view_book_statistics',
  VIEW_AUTHOR_STATISTICS = 'view_author_statistics',
  VIEW_BRANCH_STATISTICS = 'view_branch_statistics',
  VIEW_OVERDUE_BOOKS = 'view_overdue_books',


  VIEW_ANALYTICS = 'view_analytics',
  SEND_NOTIFICATIONS = 'send_notifications',
}
