from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "KGCentral AI Service"
    version: str = "1.0.0"
    default_locale: str = "vi"
    device: str = "cpu"
    model_dir: str = "/models"
    log_level: str = "info"

    class Config:
        env_file = ".env"


settings = Settings()
