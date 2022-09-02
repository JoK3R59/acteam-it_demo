<p align="center"><img src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" width=200 height=200></p>

# Démonstration de l'application mobile Acteam-IT
Projet pour une démonstration de la technologie React-native

# Lancer l'app:
```
expo run:android
```

## Ligne de code à ajouter pour l'installation(sans dossier Android): 

- Android/build.gradle
```
	allprojects {
		repositories {
			// maven for expo-camera
			maven {
				// expo-camera bundles a custom com.google.android:cameraview
				url "$rootDir/../node_modules/expo-camera/android/maven"
			}
		}
	}
```
- Android/app/build.gradle
```
	android {
		packagingOptions { 
			pickFirst 'lib/x86/libc++_shared.so' 
			pickFirst 'lib/x86_64/libjsc.so' 
			pickFirst 'lib/arm64-v8a/libjsc.so' 
			pickFirst 'lib/arm64-v8a/libc++_shared.so' 
			pickFirst 'lib/x86_64/libc++_shared.so' 
			pickFirst 'lib/armeabi-v7a/libc++_shared.so' 
		}
	}
```
- Android/app/src/main/AndroidManifest.xml
```
	< manifest >
		<uses-permission android:name="android.permission.CAMERA"/>
  		<uses-permission android:name="android.permission.INTERNET"/>
  		<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  		<uses-permission android:name="android.permission.RECORD_AUDIO"/>
  		<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
  		<uses-permission android:name="android.permission.VIBRATE"/>
  		<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  		<uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />
	</ manifest >
```
- app.json
```
	"expo": {
		"plugins": [
			"@config-plugins/react-native-blob-util",
			"@config-plugins/react-native-pdf",
			[
				"expo-media-library",
				{
					"photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
					"savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
					"isAccessMediaLocationEnabled": true
				}
			]
		]
	}
```
