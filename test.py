import os
import cv2
import pickle

def generate_face_images(full_imgs_path, coords_path, output_face_imgs_path):
    with open(coords_path, 'rb') as f:
        coord_list = pickle.load(f)
    

    os.makedirs(output_face_imgs_path, exist_ok=True)
    

    for idx, coords in enumerate(coord_list):
        xmin, ymin, xmax, ymax = coords
        

        img_path = os.path.join(full_imgs_path, f"{idx:08d}.png")
        img = cv2.imread(img_path)
        
        if img is not None:
            # Crop the face region using the coordinates
            face_img = img[ymin:ymax, xmin:xmax]
            
            # Resize the cropped face image to a standard size (optional)
            face_img_resized = cv2.resize(face_img, (168, 168))
            
            # Save the cropped face image to the output directory
            face_img_path = os.path.join(output_face_imgs_path, f"{idx:08d}.png")
            cv2.imwrite(face_img_path, face_img_resized)
            print(f"Saved face image: {face_img_path}")
        else:
            print(f"Warning: Couldn't load image {img_path}")
    
    print("Face image generation completed.")


full_imgs_path = './data/avatars/avator_3/full_imgs'
coords_path = './data/avatars/avator_3/coords.pkl'  
output_face_imgs_path = './data/avatars/avator_3/face_imgs'
generate_face_images(full_imgs_path, coords_path, output_face_imgs_path)


# from PIL import Image
# import os

# folder_path = "/media/almabay/StorageDisk/ADITI/LiveTalking/data/avatars/avator_3/full_imgs"  


# for filename in os.listdir(folder_path):
#     file_path = os.path.join(folder_path, filename)
#     if filename.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'gif')):
#         try:
     
#             with Image.open(file_path) as img:
            
#                 img_resized = img.resize((256, 256))
                
#                 img_resized.save(file_path)

#                 print(f"Resized and replaced: {filename}")
#         except Exception as e:
#             print(f"Error processing {filename}: {e}")
