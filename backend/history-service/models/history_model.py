from beanie import Document, PydanticObjectId


class History(Document):
    email: str
    matched_email: str
    difficulty_level: str
    question_title: str
    question_id: str

    class Settings:
        name = "history"
