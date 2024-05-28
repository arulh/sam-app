from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def read_root():
    return "Server running..."

@app.post("/upload-file/")
async def create_upload_file(image: UploadFile = File(...)):
    # with open(file.filename, "wb") as buffer:
    #     buffer.write(file.file.read())
    image = Image.open(io.BytesIO(await image.read()))
    print(f"{image.size=}")
    return {"filename": "image"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)