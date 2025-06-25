// js-dos 기반 완전 자동 실행 DOSBox 구현체
class AutoDOSBox {
    constructor() {
        this.dos = null;
        this.currentGame = null;
        this.isRunning = false;
        this.keypadVisible = false;
        
        // DOM 요소들
        this.gamePlayer = document.getElementById('gamePlayer');
        this.playerTitle = document.getElementById('playerTitle');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.loadingStatus = document.getElementById('loadingStatus');
        this.virtualKeypad = document.getElementById('virtualKeypad');
        this.dosboxContainer = document.getElementById('dosbox-container');
        this.dosboxCanvas = document.getElementById('dosbox-canvas');
        
        this.initializeEventListeners();
        this.log('🎮 Auto DOSBox 시스템 준비 완료');
    }
    
    initializeEventListeners() {
        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if (!this.isRunning) return;
            
            // Alt + Enter: 전체화면
            if (e.altKey && e.key === 'Enter') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            // F1: 키패드 토글
            else if (e.key === 'F1') {
                e.preventDefault();
                this.toggleKeypad();
            }
        });
    }
    
    log(message) {
        console.log(`[AutoDOSBox] ${message}`);
    }
    
    updateLoadingStatus(status) {
        this.loadingStatus.textContent = status;
        this.log(status);
    }
    
    getGameInfo(gameFile) {
        const gameInfos = {
            'Golden Axe - Hercules.zip': {
                title: 'Golden Axe',
                executable: 'GOLD.EXE'
            },
            'Prince of Persia 2.zip': {
                title: 'Prince of Persia 2: The Shadow and the Flame',
                executable: 'PRINCE.EXE'
            },
            'Prince of Persia (Fixed).zip': {
                title: 'Prince of Persia',
                executable: 'PRINCE.EXE'
            },
            'golden-axe.zip': {
                title: 'Golden Axe (Alternative)',
                executable: 'GOLD.EXE'
            }
        };
        
        return gameInfos[gameFile] || { 
            title: gameFile, 
            executable: 'GAME.EXE'
        };
    }
    
    async startGame(gameFile) {
        try {
            this.log(`게임 시작 요청: ${gameFile}`);
            
            // 게임 정보 설정
            this.currentGame = this.getGameInfo(gameFile);
            
            // UI 전환
            this.showGamePlayer();
            this.playerTitle.textContent = this.currentGame.title;
            
            // 로딩 상태 표시
            this.updateLoadingStatus('js-dos 라이브러리 초기화 중...');
            
            // js-dos 확인
            if (typeof Dos === 'undefined') {
                throw new Error('js-dos 라이브러리가 로드되지 않았습니다.');
            }
            
            // 캔버스 설정
            this.dosboxCanvas.width = 640;
            this.dosboxCanvas.height = 400;
            
            this.updateLoadingStatus('DOSBox 에뮬레이터 생성 중...');
            
            // 게임 URL (.zip을 .jsdos로 변경)
            const gameUrl = `public/games/${gameFile.replace('.zip', '.jsdos')}`;
            
            this.updateLoadingStatus(`게임 파일 로드 중: ${gameFile}`);
            
            // js-dos v6.22 올바른 사용법
            this.updateLoadingStatus('js-dos 시작 중...');
            
            // Dos() 함수로 직접 실행
            Dos(this.dosboxCanvas, {
                wdosboxUrl: "lib/wdosbox.js"
            }).ready((fs, main) => {
                this.updateLoadingStatus('파일시스템 준비 중...');
                
                // .jsdos 번들 로드
                fs.extract(gameUrl).then(() => {
                    this.updateLoadingStatus('게임 시작 중...');
                    
                    // DOS 명령어로 직접 게임 실행
                    // 게임 파일이 루트에 압축 해제되었으므로 바로 실행
                    main(["-c", this.currentGame.executable]);
                    
                    this.hideLoading();
                    this.isRunning = true;
                    this.log(`게임 실행 완료: ${this.currentGame.title}`);
                    
                    // 골든 액스 게임의 경우 화면 설정 자동화
                    if (this.currentGame.title.includes('Golden Axe')) {
                        this.log('골든 액스 화면 설정 자동화 시작...');
                        setTimeout(() => {
                            this.sendAutoKey('4'); // 화면 설정에서 4번 선택
                            this.log('골든 액스 화면 설정 완료 (4번 선택)');
                        }, 3000); // 3초 후 자동 키 입력
                    }
                    
                }).catch(error => {
                    this.log(`게임 실행 실패: ${error.message}`);
                    // .jsdos가 실패하면 원래 ZIP으로 재시도
                    this.log('ZIP 파일로 재시도합니다...');
                    const originalGameUrl = `public/games/${gameFile}`;
                    
                    fs.extract(originalGameUrl).then(() => {
                        this.updateLoadingStatus('게임 시작 중...');
                        
                        // DOS 명령어로 직접 게임 실행
                        // 게임 파일이 루트에 압축 해제되었으므로 바로 실행
                        main(["-c", this.currentGame.executable]);
                        
                        this.hideLoading();
                        this.isRunning = true;
                        this.log(`게임 실행 완료: ${this.currentGame.title}`);
                        
                        // 골든 액스 게임의 경우 화면 설정 자동화
                        if (this.currentGame.title.includes('Golden Axe')) {
                            this.log('골든 액스 화면 설정 자동화 시작...');
                            setTimeout(() => {
                                this.sendAutoKey('4'); // 화면 설정에서 4번 선택
                                this.log('골든 액스 화면 설정 완료 (4번 선택)');
                            }, 3000); // 3초 후 자동 키 입력
                        }
                        
                    }).catch(zipError => {
                        this.log(`ZIP 파일 실행도 실패: ${zipError.message}`);
                        this.showError(`게임 실행 실패: ${zipError.message}`);
                    });
                });
                
            }).catch(error => {
                this.log(`js-dos 초기화 실패: ${error.message}`);
                this.showError(`js-dos 초기화 실패: ${error.message}`);
            });
            
        } catch (error) {
            this.log(`게임 시작 실패: ${error.message}`);
            this.showError(`게임 시작 실패: ${error.message}`);
        }
    }
    
    showGamePlayer() {
        this.gamePlayer.classList.add('active');
        // 모바일에서는 키패드 자동 표시
        if (window.innerWidth <= 768) {
            this.virtualKeypad.classList.add('show');
            this.keypadVisible = true;
        }
    }
    
    hideLoading() {
        this.loadingOverlay.classList.add('hidden');
    }
    
    showError(message) {
        this.updateLoadingStatus(`오류: ${message}`);
        // 5초 후 게임 목록으로 돌아가기
        setTimeout(() => {
            this.showGameList();
        }, 5000);
    }
    
    showGameList() {
        this.gamePlayer.classList.remove('active');
        this.loadingOverlay.classList.remove('hidden');
        this.virtualKeypad.classList.remove('show');
        this.keypadVisible = false;
        
        // DOSBox 정리
        if (this.dos) {
            try {
                this.dos.exit();
            } catch (e) {
                this.log('DOSBox 정리 중 오류 (무시됨)');
            }
            this.dos = null;
        }
        
        this.isRunning = false;
        this.currentGame = null;
        this.updateLoadingStatus('DOSBox 초기화 중...');
        this.log('게임 목록으로 돌아갔습니다');
    }
    
    toggleFullscreen() {
        if (!this.isRunning) return;
        
        try {
            if (!document.fullscreenElement) {
                this.dosboxCanvas.requestFullscreen().then(() => {
                    this.log('전체화면 모드로 전환');
                }).catch(err => {
                    this.log(`전체화면 전환 실패: ${err.message}`);
                });
            } else {
                document.exitFullscreen().then(() => {
                    this.log('전체화면 모드 해제');
                }).catch(err => {
                    this.log(`전체화면 해제 실패: ${err.message}`);
                });
            }
        } catch (error) {
            this.log(`전체화면 기능 오류: ${error.message}`);
        }
    }
    
    toggleKeypad() {
        this.keypadVisible = !this.keypadVisible;
        if (this.keypadVisible) {
            this.virtualKeypad.classList.add('show');
        } else {
            this.virtualKeypad.classList.remove('show');
        }
        this.log(`가상 키패드 ${this.keypadVisible ? '표시' : '숨김'}`);
    }
    
    sendKey(keyName) {
        if (!this.isRunning || !this.dos) return;
        
        try {
            // js-dos 키 입력 매핑
            const keyMappings = {
                'Escape': 'ESC',
                'Enter': 'ENTER',
                'Space': 'SPACE',
                'Slash': 'SLASH',
                'NumpadMultiply': 'KP_MULTIPLY',
                'NumpadSubtract': 'KP_MINUS',
                'NumpadAdd': 'KP_PLUS',
                'Equal': 'EQUALS',
                'PageUp': 'PAGEUP',
                'PageDown': 'PAGEDOWN',
                'Numpad0': 'KP_0',
                'Numpad1': 'KP_1',
                'Numpad2': 'KP_2',
                'Numpad3': 'KP_3',
                'Numpad4': 'KP_4',
                'Numpad5': 'KP_5',
                'Numpad6': 'KP_6',
                'Numpad7': 'KP_7',
                'Numpad8': 'KP_8',
                'Numpad9': 'KP_9'
            };
            
            const dosKey = keyMappings[keyName] || keyName;
            
            // js-dos에 키 이벤트 전송
            if (this.dos.sendKeyEvent) {
                this.dos.sendKeyEvent(dosKey, true);  // 키 다운
                setTimeout(() => {
                    this.dos.sendKeyEvent(dosKey, false); // 키 업
                }, 50);
            }
            
            this.log(`키 입력 전송: ${keyName} -> ${dosKey}`);
        } catch (error) {
            this.log(`키 입력 전송 실패: ${error.message}`);
        }
    }
    
    sendAutoKey(keyName) {
        if (!this.isRunning) return;
        
        try {
            this.log(`자동 키 입력: ${keyName}`);
            
            // 캔버스에 포커스 설정
            if (this.dosboxCanvas) {
                this.dosboxCanvas.focus();
            }
            
            // 키보드 이벤트 시뮬레이션
            const keyDownEvent = new KeyboardEvent('keydown', {
                key: keyName,
                code: `Digit${keyName}`,
                keyCode: keyName.charCodeAt(0),
                which: keyName.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            
            const keyUpEvent = new KeyboardEvent('keyup', {
                key: keyName,
                code: `Digit${keyName}`,
                keyCode: keyName.charCodeAt(0),
                which: keyName.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            
            // 키 이벤트 전송
            this.dosboxCanvas.dispatchEvent(keyDownEvent);
            setTimeout(() => {
                this.dosboxCanvas.dispatchEvent(keyUpEvent);
            }, 100);
            
        } catch (error) {
            this.log(`자동 키 입력 실패: ${error.message}`);
        }
    }
    
    resetGame() {
        if (!this.isRunning) return;
        
        if (confirm('게임을 재시작하시겠습니까?')) {
            const currentGameFile = Object.keys(this.getGameInfo()).find(
                key => this.getGameInfo(key).title === this.currentGame.title
            );
            
            this.showGameList();
            
            // 잠시 후 게임 재시작
            setTimeout(() => {
                if (currentGameFile) {
                    this.startGame(currentGameFile);
                }
            }, 1000);
        }
    }
}

// 전역 변수
let autoDOSBox;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    autoDOSBox = new AutoDOSBox();
});

// 전역 함수들 (HTML onclick에서 사용)
function startGame(gameFile) {
    if (autoDOSBox) {
        autoDOSBox.startGame(gameFile);
    }
}

function showGameList() {
    if (autoDOSBox) {
        autoDOSBox.showGameList();
    }
}

function toggleFullscreen() {
    if (autoDOSBox) {
        autoDOSBox.toggleFullscreen();
    }
}

function toggleKeypad() {
    if (autoDOSBox) {
        autoDOSBox.toggleKeypad();
    }
}

function sendKey(keyName) {
    if (autoDOSBox) {
        autoDOSBox.sendKey(keyName);
    }
}

function resetGame() {
    if (autoDOSBox) {
        autoDOSBox.resetGame();
    }
}