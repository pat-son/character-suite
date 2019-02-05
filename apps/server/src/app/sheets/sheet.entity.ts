import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { GameEnum } from './sheets.enum';

interface CharacterClass {
    className: string;
    level: number;
    favored?: boolean;
}

interface Ability {
    score?: number;
    temp?: number;
    misc?: number;
}

interface Abilities {
    str: Ability;
    dex: Ability;
    con: Ability;
    int: Ability;
    wis: Ability;
    cha: Ability;
}

interface Health {
    total?: number;
    current?: number;
    wounds?: string;
    nonlethal?: number;
}

interface Speed {
    land?: number;
    inArmor?: number;
    fly?: number;
    flyManeuverability?: string;
    swim?: number;
    climb?: number;
    burrow?: number;
}

interface Initiative {
    misc?: number;
}

interface AC {
    armor?: number;
    shield?: number;
    size?: number;
    natural?: number;
    deflection?: number;
    dodge?: number;
    misc?: number;
    touchMod?: number;
    flatFootedMod?: number;
}

interface DR {
    type: string;
    amount: number;
}

interface ER {
    type: string;
    amount?: number;
    vulnerable?: boolean;
}

interface Save {
    base?: number;
    magic?: number;
    misc?: number;
    temp?: number;
}

interface Saves {
    fortitude: Save;
    reflex: Save;
    will: Save;
}

interface Weapon {
    name?: string;
    attackBonus?: number;
    critical?: string;
    type?: string;
    range?: string;
    usesAmmo?: boolean;
    ammo?: string;
    damage?: string;
}

interface Skill {
    name: string;
    classSkill: boolean;
    ability: string;
    ranks?: number;
    misc?: number;
    trainedOnly: boolean;
}

interface AcItem {
    name?: string;
    bonus?: number;
    type?: string;
    checkPenalty?: number;
    spellFailure?: string;
    weight?: string;
    properties: string;
}

interface Gear {
    name?: string;
    weight?: string; // TODO: Weight in numbers with an option sheet-wide for units
    notes?: string;
}

interface Feat {
    name?: string;
    notes?: string;
}

interface SpecialAbility {
    name?: string;
    notes?: string;
}

interface Money {
    cp?: number;
    sp?: number;
    gp?: number;
    pp?: number;
}

interface XP {
    total?: number;
    nextLevel?: number;
}

interface SpellsKnown {
    level: number;
    known?: number;
    saveDc?: number;
    perDay?: number;
    bonus?: number;
}

interface Spell {
    name?: string;
    notes?: string;
    prepared?: number;
    cast?: number;
}

interface SpellList {
    level: number;
    spells: Spell[];
}

export interface Pathfinder1stCharacterData {
    alignment?: string;
    classes: CharacterClass[];
    deity?: string;
    homeland?: string;
    race?: string;
    size?: string;
    sizeMod?: number;
    gender?: string;
    age?: number;
    weight?: string;
    hair?: string;
    eyes?: string;

    abilities: Abilities;
    health: Health;
    speed: Speed;
    init: Initiative;
    ac: AC;
    dr: DR[];
    er: ER[];
    saves: Saves;
    sr?: number;

    bab: number[];
    cmbMods: {type: string, amount: number}[];
    cmdMods: {type: string, amount: number}[];
    weapons: Weapon[];
    acItems: AcItem[];

    skills: Skill[];
    languages: string;

    gear: Gear[];
    money: Money;
    lightLoad?: string; // TODO: Weight in numbers with an option sheet-wide for units
    mediumLoad?: string;
    heavyLoad?: string;
    liftOverHead?: string;
    liftOffGround?: string;
    dragOrPush?: string;

    feats: Feat[];
    specialAbilities: SpecialAbility[];

    xp: XP;

    spellsKnown: SpellsKnown[];
    spellsKnownNotes?: string;
    domain: string;
    spellList: SpellList[];
}

@Entity({ name: 'sheets' })
export class SheetEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;

    @Column()
    ownerId: string;

    @Column()
    gameType: GameEnum;

    @Column()
    name: string;

    @Column()
    data: any;
}

@Entity({ name: 'sheets' })
export class Pathfinder1stSheetEntity extends SheetEntity {
    @Column()
    data: Pathfinder1stCharacterData;
}
