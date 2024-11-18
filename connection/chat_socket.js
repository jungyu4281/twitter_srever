// 필요한 모듈 임포트
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'  // 모든 도메인에서의 접속을 허용
    }
});

// Socket.IO 연결 및 이벤트 처리
io.on('connection', (socket) => {
    console.log('클라이언트가 접속했습니다.');

    // 닉네임 설정 이벤트
    socket.on('setNickname', (nickname) => {
        socket.nickname = nickname; // 소켓 객체에 닉네임 저장
    });

    // 메시지 이벤트 처리
    socket.on('message', (message) => {
        const sender = socket.nickname || '익명'; // 닉네임이 없으면 '익명'으로 표시
        // 모든 클라이언트에게 메시지 전송
        io.emit('message', {
            sender: sender,
            message: message
        });
    });

    // 클라이언트 연결 해제 시 로그 출력
    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 해제했습니다.');
    });
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});