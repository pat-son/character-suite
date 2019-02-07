import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { GameEnum } from './sheets.enum';
import { ObjectID } from 'mongodb';

class CharacterClass {
    className = '';
    level: number = null;
    favored: boolean = null;
}

class Ability {
    score: number = null;
    temp: number = null;
    misc: number = null;
}

class Abilities {
    str = new Ability();
    dex = new Ability();
    con = new Ability();
    int = new Ability();
    wis = new Ability();
    cha = new Ability();
}

class Health {
    total: number = null;
    current: number = null;
    wounds = '';
    nonlethal: number = null;
}

class Speed {
    land: number = null;
    inArmor: number = null;
    fly: number = null;
    flyManeuverability = '';
    swim: number = null;
    climb: number = null;
    burrow: number = null;
}

class Initiative {
    misc: number = null;
}

class AC {
    armor: number = null;
    shield: number = null;
    size: number = null;
    natural: number = null;
    deflection: number = null;
    dodge: number = null;
    misc: number = null;
    touchMod: number = null;
    flatFootedMod: number = null;
}

class DR {
    type = '';
    amount: number = null;
}

class ER {
    type = '';
    amount: number = null;
    vulnerable: boolean = null;
}

class Save {
    base: number = null;
    magic: number = null;
    misc: number = null;
    temp: number = null;
}

class Saves {
    fortitude = new Save();
    reflex = new Save();
    will = new Save();
}

class Weapon {
    name = '';
    attackBonus: number = null;
    critical = '';
    type = '';
    range = '';
    usesAmmo: boolean = null;
    ammo = '';
    damage = '';
}

class Skill {
    name = '';
    classSkill: boolean = null;
    ability = '';
    ranks: number = null;
    misc: number = null;
    trainedOnly: boolean = null;
}

class AcItem {
    name = '';
    bonus: number = null;
    type = '';
    checkPenalty: number = null;
    spellFailure = '';
    weight = '';
    properties = '';
}

class Gear {
    name = '';
    weight = ''; // TODO: Weight in numbers with an option sheet-wide for units
    notes = '';
}

class Feat {
    name = '';
    notes = '';
}

class SpecialAbility {
    name = '';
    notes = '';
}

class Money {
    cp: number = null;
    sp: number = null;
    gp: number = null;
    pp: number = null;
}

class XP {
    total: number = null;
    nextLevel: number = null;
}

class SpellsKnown {
    level: number = null;
    known: number = null;
    saveDc: number = null;
    perDay: number = null;
    bonus: number = null;
}

class Spell {
    name = '';
    notes = '';
    prepared: number = null;
    cast: number = null;
}

class SpellList {
    level: number = null;
    spells: Spell[] = [];
}

class CmbMod {
    type = '';
    amount: number = null;
}

class CmdMod {
    type = '';
    amount: number = null;
}

export class Pathfinder1stCharacterData {
    alignment = '';
    classes: CharacterClass[] = [];
    deity = '';
    homeland = '';
    race = '';
    size = '';
    sizeMod: number = null;
    gender = '';
    age: number = null;
    weight = '';
    hair = '';
    eyes = '';

    abilities = new Abilities();
    health = new Health();
    speed = new Speed();
    init = new Initiative();
    ac = new AC();
    dr: DR[] = [];
    er: ER[] = [];
    saves = new Saves();
    sr: number = null;

    bab: number[] = [];
    cmbMods: CmbMod[] = [];
    cmdMods: CmdMod[] = [];
    weapons: Weapon[] = [];
    acItems: AcItem[] = [];

    skills: Skill[] = [];
    languages = '';

    gear: Gear[];
    money = new Money();
    lightLoad = ''; // TODO: Weight in numbers with an option sheet-wide for units
    mediumLoad = '';
    heavyLoad = '';
    liftOverHead = '';
    liftOffGround = '';
    dragOrPush = '';

    feats: Feat[] = [];
    specialAbilities: SpecialAbility[] = [];

    xp = new XP();

    spellsKnown: SpellsKnown[] = [];
    spellsKnownNotes = '';
    domain = '';
    spellList: SpellList[] = [];
}

@Entity({ name: 'sheets' })
export class SheetEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;

    @Column()
    ownerId: ObjectID;

    @Column()
    gameType: GameEnum;

    @Column()
    name: string;

    @Column()
    data: any;

    constructor(name: string, ownerId: ObjectID) {
        this.createdDate = new Date();
        this.updatedDate = new Date();
        this.name = name;
        this.ownerId = ownerId;
    }
}

@Entity({ name: 'sheets' })
export class Pathfinder1stSheetEntity extends SheetEntity {
    @Column()
    gameType = GameEnum.Pathfinder1stEdition;

    @Column()
    data = new Pathfinder1stCharacterData();

    constructor(name: string, ownerId: ObjectID) {
        super(name, ownerId);
        this.data = new Pathfinder1stCharacterData();
    }
}
