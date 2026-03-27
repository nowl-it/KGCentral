from typing import Callable
from src.config import settings


_translations: dict[str, dict[str, dict[str, str]]] = {
    "vi": {
        "health": {
            "ok": "Dịch vụ hoạt động tốt",
            "error": "Dịch vụ gặp lỗi",
        },
        "inference": {
            "model_not_found": "Không tìm thấy model",
            "inference_failed": "Suy luận thất bại",
        },
    },
    "en": {
        "health": {
            "ok": "Service is healthy",
            "error": "Service encountered an error",
        },
        "inference": {
            "model_not_found": "Model not found",
            "inference_failed": "Inference failed",
        },
    },
}

_current_locale: str = settings.default_locale


def init_i18n() -> None:
    global _current_locale
    _current_locale = settings.default_locale


def set_locale(locale: str) -> None:
    global _current_locale
    if locale in _translations:
        _current_locale = locale


def get_locale() -> str:
    return _current_locale


def t(key: str, locale: str | None = None) -> str:
    """
    Translate a key to the current or specified locale.
    Key format: "namespace.key" (e.g., "health.ok")
    """
    lang = locale or _current_locale
    if lang not in _translations:
        lang = settings.default_locale

    parts = key.split(".")
    if len(parts) != 2:
        return key

    namespace, msg_key = parts
    translations = _translations.get(lang, {})
    namespace_translations = translations.get(namespace, {})
    return namespace_translations.get(msg_key, key)
