<script lang="ts">
    import MemoCard from '$lib/MemoCard/index.svelte';
    import { shuffleArray } from '$lib/arrayUtils';

    type Card = {
        id: number,
        status: 'front' | 'back',
        key: string
    };

    function genCards(keys: string[]): Card[] {
        const duplicatedKeys = keys.flatMap(key => [key, key]);
        const shuffledArray = shuffleArray(duplicatedKeys);
        return shuffledArray.map((key, index) => ({
            id: index + 1,
            status: 'back',
            key
        }));
    }

    let cards = genCards(['Russia', 'Slovenia', 'Slovakia', 'Argentina', 'Switzerland', 'Mongolia']);

    let currentCard: Card | null = null;
    let canPlay = true;
    let score = 0;
    let attempts = 0;
    let time: number = 0;
    let timer: NodeJS.Timeout | null = null;

    function startTimer() {
        timer = setInterval(() => {
            time++;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    $: isGameFinished = cards.filter(card => card.status === 'back').length === 0;
    $: if (timer !== null && isGameFinished) {
        stopTimer();
    }
    
    function turnCard(id: number) {
        if (timer === null) {
            startTimer();
        }
        const index = cards.findIndex((card) => card.id === id);
        if (canPlay && cards[index].status !== 'front') {
            cards[index].status = 'front';
            if (currentCard === null) currentCard = cards[index];
            else if (currentCard.id !== id){
                if (currentCard.key === cards[index].key) {
                    currentCard = null;
                    attempts++;
                    score++;
                }
                else {
                    canPlay = false;
                    attempts++;
                    setTimeout(() => {
                        cards[index].status = 'back';
                        currentCard.status = 'back';
                        currentCard = null;
                        canPlay = true;
                    }, 1000);
                }
            }
        }        
    }
</script>

<svelte:head>
    <title>Memo Test</title>
</svelte:head>

<div class="content">
    <h1>Time: {time}s</h1>
    <h1>Score: {score}</h1>
    <h1>Attempts: {attempts}</h1>
    {#if isGameFinished}
        <h1>You win!</h1>
    {/if}
    <div class="game_area">
        {#each cards as card}
            <MemoCard side={card.status} frontView={card.key} on:click={() => turnCard(card.id)}/>
        {/each}
    </div>
</div>

<style>
    .content {
		width: 100%;
		margin: var(--column-margin-top) auto 0 auto;
	}

    .game_area {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    h1 {
        width: 100%;
    }
</style>