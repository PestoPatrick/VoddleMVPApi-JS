#DB tables

    Video Table (tblvideos):
    - videoid as uuid PK
    - videourl as string
    - userid as uuid FK
    - vidtitle as string
    - userpageurl as string
    - published as a Date
    - description as string
    - vidthumbnailurl as string

<br/>

    User Table (tblusers):
    - userId as UUID PK
    - username as string
    - email as string
    - passwordhash as string
