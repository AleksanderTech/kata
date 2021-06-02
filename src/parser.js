// ===SOLID===
export const fourQuartersFormatter = {
    formatScore(score) {
        return score[0][0] + ',' + score[0][1] + ',' + score[1][0] + ',' + score[1][1];
    }
}

export const fourSetsFormatter = {
    formatScore(score) {
        const scores = /([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+)/.exec(score);
        const set1 = scores[2];
        const set2 = scores[3];
        const set3 = scores[4];

        return "Main score: " + scores[1] + " ("
            + "set1 " + set1 + ", "
            + "set2 " + set2 + ", "
            + "set3 " + set3
            + ")";
    }
}

export const simpleFormatter = {
    formatScore(score) {
        return score;
    }
}

export const dashEventNameMaker = {
    makeEventName(participant1, participant2) {
        return participant1 + " - " + participant2;
    }
}

export const vsEventNameMaker = {
    makeEventName(participant1, participant2) {
        return participant1 + " vs " + participant2;
    }
}

export class SportScore {
    constructor(sport, participant1, participant2, score, formatter, eventNameMaker) {
        this.sport = sport;
        this.participant1 = participant1;
        this.participant2 = participant2;
        this.score = score;
        this.formatter = formatter;
        this.eventNameMaker = eventNameMaker;
    }

    makeEventName(){
        return this.eventNameMaker.makeEventName(this.participant1, this.participant2);
    }

    formatScore(){
        return this.formatter.formatScore(this.score);
    }    
}

export const matches = [
    new SportScore('soccer', 'Chelsea', 'Arsenal', '2:1', simpleFormatter, dashEventNameMaker),
    new SportScore('volleyball', 'Germany', 'France', '3:0,25:23,25:19,25:21', fourSetsFormatter, dashEventNameMaker),
    new SportScore('handball', 'Pogoń Szczeciń', 'Azoty Puławy', '34:26', simpleFormatter, vsEventNameMaker),
    new SportScore('basketball', 'GKS Tychy', 'GKS Katowice', [['9:7', '2:1'], ['5:3', '9:9']], fourQuartersFormatter, dashEventNameMaker),
    new SportScore('tennis', 'Maria Sharapova', 'Serena Williams', '2:1,7:6,6:3,6:7', fourSetsFormatter, vsEventNameMaker),
    new SportScore('ski jumping')
];

// Closed for changes, open for extensibility
export default class EventParser {

    makeEventName(match) {
        try {
            return match.makeEventName();
        } catch (err) {
            // error handling
            return "Exception: invalid sport";
        }

    }

    formatScore(match) {
        try {
            return match.formatScore();
        } catch (err) {
            // error handling
            return "Exception: invalid sport";
        }

    }
}
// ===SOLID===
