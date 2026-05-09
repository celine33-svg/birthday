import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Dog, 
  Send, 
  MapPin, 
  Gift, 
  CheckCircle2, 
  Cake,
  Backpack,
  Map as MapIcon
} from "lucide-react";
import confetti from "canvas-confetti";

enum GameState {
  START = "START",
  STAGE_1_WAIT = "STAGE_1_WAIT",
  STAGE_1_COMPLETE = "STAGE_1_COMPLETE",
  STAGE_2_WAIT = "STAGE_2_WAIT",
  STAGE_2_COMPLETE = "STAGE_2_COMPLETE",
  STAGE_3_WAIT = "STAGE_3_WAIT",
  STAGE_3_COMPLETE = "STAGE_3_COMPLETE",
  SETTLEMENT = "SETTLEMENT",
  FINISHED = "FINISHED"
}

interface Message {
  id: number;
  sender: "小白" | "小鸡毛";
  text: string;
  timestamp: Date;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender: "小白" | "小鸡毛", text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender,
        text,
        timestamp: new Date()
      }
    ]);
  };

  const handleSend = () => {
    const input = inputValue.trim();
    if (!input) return;

    addMessage("小鸡毛", input);
    setInputValue("");
    processLogic(input);
  };

  const processLogic = (input: string) => {
    const normalizedInput = input.toLowerCase();

    switch (gameState) {
      case GameState.START:
        if (normalizedInput === "你好" || normalizedInput === "开始") {
          setTimeout(() => {
            addMessage("小白", "汪汪！小鸡毛，Welcome to the Birthday Quest 🍄！生日快乐！");
            addMessage("小白", "为了给你准备惊喜，我把最终奖励的密码字母藏在 Amsterdam Noord 的各个角落啦！");
            addMessage("小白", "每当你到一个地点并猜出它的名字，我就会把属于那里的字母碎片交给你。当所有字母集齐，最终奖励就会出现。");
            addMessage("小白", "准备好出发了吗？第一关已经开始啦，祝你好运！\n\n【第一关线索】这有一个神秘图标（你手里应该有线索啦），我们要找的是它在荷兰的“远房亲戚”哦！名字有四个字母。快去找到它，并把店名告诉我吧！（英文，忽略大小写）");
            setGameState(GameState.STAGE_1_WAIT);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "汪汪？要开始生日大冒险吗？快对我说“开始”吧！🐶");
          }, 600);
        }
        break;

      case GameState.STAGE_1_WAIT:
        if (normalizedInput === "hema") {
          setTimeout(() => {
            addMessage("小白", "完全正确！小鸡毛真聪明，你成功找到了 HEMA！");
            addMessage("小白", "我在那里藏了三个字母碎片：【E】【M】【A】！快把它们好好装进口袋~");
            addMessage("小白", "准备好迎接下一关了吗？请回复“继续”获取线索。");
            setGameState(GameState.STAGE_1_COMPLETE);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "唔，不对哦... 温柔提醒：那是一个荷兰非常有名的连锁店，Logo 通常是红色的，名字只有四个字母哦！再想想？汪~");
          }, 600);
        }
        break;

      case GameState.STAGE_1_COMPLETE:
        if (normalizedInput === "继续") {
          setTimeout(() => {
            addMessage("小白", "现在，我们需要化身侦探狗狗！");
            addMessage("小白", "请看看你手里的那张纸质传单，它的首页和某家店铺完全一致哦。");
            addMessage("小白", "请仔细观察周围，找到这家店铺，并把它的名字告诉我吧！（英文，忽略大小写）");
            setGameState(GameState.STAGE_2_WAIT);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "快回复“继续”来开启下一关呀，大奖在等着你呢！🎁");
          }, 600);
        }
        break;

      case GameState.STAGE_2_WAIT:
        if (normalizedInput === "kruidvat") {
          setTimeout(() => {
            addMessage("小白", "答对啦！这家店的红色招牌是不是很显眼呀？");
            addMessage("小白", "你真棒呀，作为奖励，交给你四个字母碎片：【K】【R】【I】【D】。");
            addMessage("小白", "目前你已经拥有了 7 个字母了，距离真相越来越近！回复“出发”前往最后一站！");
            setGameState(GameState.STAGE_2_COMPLETE);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "没找到吗？提示一下：那家店通常卖很多护肤品和零食，招牌也是红白色的，名字是 K 开头的。加油！");
          }, 600);
        }
        break;

      case GameState.STAGE_2_COMPLETE:
        if (normalizedInput === "出发") {
          setTimeout(() => {
            addMessage("小白", "最后一站的线索有些深奥哦，听好啦：“古人曾用五行对应方向。青龙所在之地，太阳最先经过。”");
            addMessage("小白", "太阳最先经过的地方……是不是有很多小鸡毛爱吃的好吃的？！");
            addMessage("小白", "没错！请前往这个充满神秘力量的地点，到达后告诉我店名！（中文或英文，忽略大小写）");
            setGameState(GameState.STAGE_3_WAIT);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "还在休息吗？回个“出发”，我们要去吃好吃的咯！🌭");
          }, 600);
        }
        break;

      case GameState.STAGE_3_WAIT:
        if (normalizedInput === "amazing oriental" || normalizedInput === "东方行" || normalizedInput === "oriental") {
          setTimeout(() => {
            addMessage("小白", "哇，聪明的小鸡毛！——是不是已经闻到香味啦？你终于到了 Amazing Oriental！");
            addMessage("小白", "在这里，我为你准备了两个特殊的生日限时任务，完成它们才能获得最后的字母哦：");
            addMessage("小白", "任务 1：挑选并买下一个你从来没有尝试过的小零食！");
            addMessage("小白", "任务 2：买一个生产日期或过期时间为 5月10日、6月25日 或 10月8日 的小零食（满足任一日期即可😉）");
            addMessage("小白", "买好之后拍张照片作证！然后大声告诉我：“任务完成”！（拍照完成任务前不可以直接输入！）");
            setGameState(GameState.STAGE_3_COMPLETE);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "提示：那是荷兰最大的东方超市哦！名字和东方有关~ 汪！");
          }, 600);
        }
        break;

      case GameState.STAGE_3_COMPLETE:
        if (normalizedInput === "任务完成") {
          setTimeout(() => {
            addMessage("小白", "太完美啦！小鸡毛不仅完成了任务，还收获了最后的三个字母：【M】【A】【T】。");
            addMessage("小白", "现在，请把你手上收集到的所有字母碎片拿出来：\n【E】【M】【A】【K】【R】【I】【D】【M】【A】【T】");
            addMessage("小白", "一共十个字母！快把它们重新排列组合一下，拼出一个我们非常熟悉的地点。");
            addMessage("小白", "拼出正确的单词并发送给我，你的终极生日奖励就在那里等你！");
            setGameState(GameState.SETTLEMENT);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "任务还没完成吗？不许撒谎哦，小白会检查的！完成任务后请对我说“任务完成”。");
          }, 600);
        }
        break;

      case GameState.SETTLEMENT:
        if (normalizedInput === "mediamarkt") {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setTimeout(() => {
            addMessage("小白", "🎉 汪汪汪！回答正确！就是 MediaMarkt！");
            addMessage("小白", "恭喜小鸡毛完成了所有的生日挑战！你的最终大礼已经在这个地方准备就绪啦。");
            addMessage("小白", "再次祝你生日快乐！希望你喜欢我为你准备的这场大冒险！快去拿你的礼物吧！🎂🎈");
            setGameState(GameState.FINISHED);
          }, 600);
        } else {
          setTimeout(() => {
            addMessage("小白", "嗯... 字母拼得不太对哦。提示：这是一个卖各种电子产品、耳机、游戏机的大商场！想想看？汪！");
          }, 600);
        }
        break;

      case GameState.FINISHED:
        setTimeout(() => {
          addMessage("小白", "生日快乐！别忘了以后也要一直快快乐乐地吃好吃的哦！我们下次冒险再见！🐶");
        }, 600);
        break;
    }
  };

  const collectedLetters = useMemo(() => {
    let letters: string[] = [];
    const statesGotFirst = [GameState.STAGE_1_COMPLETE, GameState.STAGE_2_WAIT, GameState.STAGE_2_COMPLETE, GameState.STAGE_3_WAIT, GameState.STAGE_3_COMPLETE, GameState.SETTLEMENT, GameState.FINISHED];
    const statesGotSecond = [GameState.STAGE_2_COMPLETE, GameState.STAGE_3_WAIT, GameState.STAGE_3_COMPLETE, GameState.SETTLEMENT, GameState.FINISHED];
    const statesGotThird = [GameState.SETTLEMENT, GameState.FINISHED];

    if (statesGotFirst.includes(gameState)) {
      letters.push("E", "M", "A");
    }
    if (statesGotSecond.includes(gameState)) {
      letters.push("K", "R", "I", "D");
    }
    if (statesGotThird.includes(gameState)) {
      letters.push("M", "A", "T");
    }
    return letters;
  }, [gameState]);

  return (
    <div className="h-screen w-full m-0 p-0 overflow-hidden bg-quest-bg text-quest-text flex flex-col font-sans">
      <div className="flex flex-col h-full w-full p-4 sm:p-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-quest-accent flex items-center justify-center text-3xl shadow-sm overflow-hidden shrink-0">
              <Dog size={32} className="text-stone-400" />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h1 className="fredoka text-3xl font-bold tracking-tight text-quest-heading uppercase">Birthday Quest</h1>
              <p className="text-sm font-medium opacity-70">Amsterdam Noord Adventure • Host: 小白</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-sm border border-quest-accent">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Target:</span>
            <div className="w-8 h-8 bg-yellow-300 rounded-full border-2 border-white flex items-center justify-center shadow-inner text-sm">
              🐤
            </div>
            <span className="font-bold">小鸡毛</span>
          </div>
        </header>

        {/* Main Adventure Area */}
        <main className="flex flex-1 gap-6 min-h-0">
          
          {/* Left Sidebar: Mission Map */}
          <section className="hidden lg:flex w-1/4 flex-col space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-orange-100 flex-1 flex flex-col overflow-hidden">
              <h3 className="fredoka text-lg font-semibold mb-6 flex items-center">
                <MapIcon className="mr-2 text-orange-500" size={20} /> 任务地图
              </h3>
              
              <div className="relative flex-1 px-4 overflow-y-auto no-scrollbar">
                <div className="absolute left-8 top-4 bottom-4 w-0.5 border-l-2 border-dotted border-orange-200"></div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-8 py-4">
                  <MapStep 
                    number="1" 
                    title="第一关: 神秘图标" 
                    status={getStepStatus(gameState, 1)} 
                    active={isStepActive(gameState, 1)}
                  />
                  <MapStep 
                    number="2" 
                    title="第二关: 侦探狗狗" 
                    status={getStepStatus(gameState, 2)} 
                    active={isStepActive(gameState, 2)}
                  />
                  <MapStep 
                    number="3" 
                    title="第三关: 东方之光" 
                    status={getStepStatus(gameState, 3)} 
                    active={isStepActive(gameState, 3)}
                  />
                  <MapStep 
                    number="?" 
                    title="终极奖励" 
                    status={gameState === GameState.FINISHED ? "Completed" : "Secret"} 
                    active={gameState === GameState.SETTLEMENT}
                    special
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-50 flex items-center gap-2 text-[10px] uppercase font-bold opacity-40">
                <MapPin size={12} /> Amsterdam Noord, NL
              </div>
            </div>
          </section>

          {/* Center Column: Interaction Area */}
          <section className="flex-1 flex flex-col min-w-0">
            <div className="bg-quest-bubble rounded-[40px] flex-1 shadow-lg border-b-8 border-r-8 border-quest-accent/80 relative flex flex-col overflow-hidden">
              
              {/* Bubble Header */}
              <div className="p-6 pb-2 flex justify-between items-start z-10">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-quest-accent inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold font-display text-quest-heading tracking-wide">
                    小白 正在说话...
                  </span>
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-quest-accent transform rotate-6">
                  <span className="text-3xl">🍄</span>
                </div>
              </div>

              {/* Chat View */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar"
              >
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                     <motion.div
                       animate={{ y: [0, -10, 0] }}
                       transition={{ repeat: Infinity, duration: 2 }}
                     >
                       <Dog size={80} className="text-orange-300 opacity-50 mb-4" />
                     </motion.div>
                     <h2 className="fredoka text-2xl mb-2 text-quest-heading">准备好出发了吗？<br/>寿星小鸡毛！</h2>
                     <p className="opacity-60 text-sm">欢迎来到生日大冒险！对我说“开始”开启挑战吧！汪！</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: msg.sender === "小白" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.sender === "小白" ? "justify-start" : "justify-end"}`}
                      >
                        <div className={`max-w-[85%] ${msg.sender === "小白" ? "bg-white text-stone-800 rounded-3xl rounded-tl-sm border-2 border-white" : "bg-orange-500 text-white rounded-3xl rounded-tr-sm"} p-4 shadow-sm relative`}>
                          <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                          <span className={`text-[9px] block mt-2 opacity-40 uppercase tracking-tighter ${msg.sender === "小白" ? "text-stone-500" : "text-white"}`}>
                            {msg.sender} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Input Zone */}
              <div className="p-6 pt-2 bg-quest-bubble/50 backdrop-blur-sm">
                <div className="bg-white/60 p-3 rounded-2xl border border-dashed border-orange-300 mb-4 flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><CheckCircle2 size={16} /></div>
                  <p className="text-[11px] font-bold uppercase tracking-tight text-quest-heading leading-tight">
                    {getHint(gameState)}
                  </p>
                </div>

                <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
                  {gameState === GameState.START && <ActionChip text="开始" onClick={() => setInputValue("开始")} />}
                  {gameState === GameState.STAGE_1_COMPLETE && <ActionChip text="继续" onClick={() => setInputValue("继续")} />}
                  {gameState === GameState.STAGE_2_COMPLETE && <ActionChip text="出发" onClick={() => setInputValue("出发")} />}
                  {gameState === GameState.STAGE_3_COMPLETE && <ActionChip text="任务完成" onClick={() => setInputValue("任务完成")} />}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={gameState === GameState.FINISHED}
                    placeholder="在这里输入答案..." 
                    className="w-full bg-white border-2 border-quest-accent rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-yellow-200 text-lg font-bold placeholder:opacity-30 placeholder:text-stone-400 shadow-inner"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || gameState === GameState.FINISHED}
                    className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white font-bold px-6 rounded-2xl shadow-md hover:bg-orange-600 active:scale-95 transition-all text-sm uppercase flex items-center gap-2"
                  >
                    <Send size={16} /> <span className="hidden sm:inline">发送</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Right Sidebar: Letter Pouch */}
          <section className="hidden xl:flex w-1/4 flex-col space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-orange-100 h-full flex flex-col">
              <h3 className="fredoka text-lg font-semibold mb-2 flex items-center">
                <Backpack className="mr-2 text-orange-500" size={20} /> 字母收集袋
              </h3>
              <p className="text-[10px] uppercase font-bold opacity-30 mb-6 tracking-tight">
                集齐碎片拼出奖励地
              </p>
              
              <div className="grid grid-cols-2 gap-3 flex-1">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-2xl flex items-center justify-center text-3xl font-black transition-all ${
                      collectedLetters[idx] 
                        ? "bg-orange-50 text-orange-500 border-2 border-orange-200 shadow-sm" 
                        : "bg-stone-50 border-2 border-dashed border-quest-pouch/40 text-stone-200"
                    }`}
                  >
                    {collectedLetters[idx] || "?"}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-50">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-bold uppercase opacity-40">Progress</span>
                   <span className="text-sm font-bold text-quest-heading">{collectedLetters.length} / 10</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(collectedLetters.length / 10) * 100}%` }}
                     className="h-full bg-orange-500"
                   />
                </div>
              </div>
            </div>
          </section>

        </main>

        <footer className="mt-6 flex items-center justify-between text-[11px] font-bold tracking-widest opacity-30 uppercase">
          <div className="flex items-center gap-2"><MapPin size={12} /> Amsterdam Noord • Adventure</div>
          <div>Line Puppy Series 2026</div>
        </footer>
      </div>

      {/* Final Success Overlay */}
      {gameState === GameState.FINISHED && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="bg-white p-10 rounded-[50px] shadow-2xl border-8 border-quest-accent text-center max-w-md mx-4 pointer-events-auto"
           >
              <div className="text-7xl mb-6">🎂</div>
              <h2 className="fredoka text-4xl text-quest-heading mb-4">任务圆满完成!</h2>
              <p className="text-lg font-bold mb-8">小鸡毛，快去 MediaMarkt 领取你的超级生日大礼包吧！汪汪！</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-white font-bold py-4 px-8 rounded-3xl shadow-xl hover:bg-orange-600 transition-all active:scale-95"
              >
                再次开始
              </button>
           </motion.div>
        </div>
      )}
    </div>
  );
}

function MapStep({ number, title, status, active, special }: { number: string; title: string; status: string; active: boolean; special?: boolean }) {
  return (
    <div className={`flex items-center space-x-4 transition-opacity ${!active && status !== "Completed" ? "opacity-30" : "opacity-100"}`}>
      <div className={`w-10 h-10 rounded-full border-4 border-white shadow flex items-center justify-center text-white text-xs font-black shrink-0 ${
        status === "Completed" ? "bg-green-500" : active ? (special ? "bg-rose-500 animate-pulse" : "bg-orange-500 scale-110") : "bg-stone-300"
      }`}>
        {status === "Completed" ? <CheckCircle2 size={16} /> : number}
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-[13px] font-bold truncate ${active ? "text-quest-heading" : ""}`}>{title}</span>
        <span className={`text-[10px] uppercase font-bold tracking-tighter ${
          status === "Completed" ? "text-green-600" : active ? "text-orange-500" : "text-stone-400"
        }`}>{status}</span>
      </div>
    </div>
  );
}

function ActionChip({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white border-2 border-quest-accent text-quest-heading px-4 py-2 rounded-2xl text-xs font-bold shadow-sm hover:bg-stone-50 transition-colors"
    >
      {text}
    </motion.button>
  );
}

function getStepStatus(state: GameState, step: number): string {
  if (step === 1) {
    if (state === GameState.START) return "Queue";
    if (state === GameState.STAGE_1_WAIT) return "Active";
    return "Completed";
  }
  if (step === 2) {
    if (state === GameState.START || state === GameState.STAGE_1_WAIT || state === GameState.STAGE_1_COMPLETE) return "Locked";
    if (state === GameState.STAGE_2_WAIT) return "Active";
    return "Completed";
  }
  if (step === 3) {
    if (state === GameState.STAGE_3_WAIT) return "Active";
    if (state === GameState.STAGE_3_COMPLETE || state === GameState.SETTLEMENT || state === GameState.FINISHED) return "Completed";
    return "Locked";
  }
  return "Locked";
}

function isStepActive(state: GameState, step: number): boolean {
  if (step === 1) return state === GameState.STAGE_1_WAIT;
  if (step === 2) return state === GameState.STAGE_2_WAIT;
  if (step === 3) return state === GameState.STAGE_3_WAIT;
  return false;
}

function getHint(state: GameState): string {
  switch (state) {
    case GameState.START: return "💡 只要回复“开始”就能出发啦！";
    case GameState.STAGE_1_WAIT: return "💡 红色的 Logo，四个字母，荷兰随处可见！";
    case GameState.STAGE_2_WAIT: return "💡 红色招牌，卖药妆和零食的！";
    case GameState.STAGE_3_WAIT: return "💡 荷兰最大的东方超市，名字和东方有关！";
    case GameState.STAGE_3_COMPLETE: return "💡 完成任务后，请大声回复“任务完成”！";
    case GameState.SETTLEMENT: return "💡 字母已经集齐啦，快拼出礼物所在地！";
    case GameState.FINISHED: return "🎉 冒险结束，快去拿礼物吧！";
    default: return "💡 正在等待下一关线索...";
  }
}
