const exec = require('child_process').exec;

const getVideoMetaData = function (videoPath) {
    return new Promise((resolve, reject) => {
        try {
            const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams  ${videoPath}`;
            exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    reject(error)
                } else {
                    let Stream = JSON.parse(stdout)
                    let videoData = Stream.format
                    resolve(videoData)
                }
            });
        } catch (error) {
            console.log("Error in generating metadata of video-->", error)
            return reject(error);
        }
    });
}

const getVideoDuration = function (videoPath) {
    return new Promise((resolve, reject) => {
        try {
            const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams  ${videoPath}`;
            exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    reject(error)
                } else {
                    let Stream = JSON.parse(stdout)
                    let videoData = Stream.format
                    resolve(videoData.duration / 1)
                }
            });
        } catch (error) {
            console.log("Error in generating metadata of video-->", error)
            return reject(error);
        }
    });
}

const makeThumbForvideo = (videoPath, outputPath, thumbTime) => {
    return new Promise((resolve, reject) => {
        try {
            outputPath = outputPath + `${file.filename}_Thumb.jpg`
            const cmd = `ffmpeg -i ${videoPath} -vframes 1 -an -s 1000x563 -ss ${thumbTime} ${outputPath}`;
            exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            });
        } catch (error) {
            console.log("Error in generating thumbnail of video-->", error)
            reject(error);
        }
    });
};




module.exports = {
    getVideoMetaData,
    getVideoDuration,
    makeThumbForvideo
}