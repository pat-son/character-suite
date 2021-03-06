import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GameEnum } from './sheets.enum';

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

class ArmorClass {
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

class DamageResistance {
    type = '';
    amount: number = null;
}

class EnergyResistance {
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

// Todo: maybe split spell lists up by class if multiclassing?
class SpellList {
    level: number = null;
    spells: Spell[] = [];
}

// TODO: Change Cmb and Cmd to something more concrete
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
    initiative = new Initiative();
    armorClass = new ArmorClass();
    damageResistance: DamageResistance[] = [];
    energyResistance: EnergyResistance[] = [];
    saves = new Saves();
    spellResistance: number = null;

    baseAttackBonus: number;
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
    domains: string[] = [];
    spellList: SpellList[] = [];
}

@Entity({ name: 'sheets' })
export class SheetEntity {
    @PrimaryGeneratedColumn({ name: 'sheet_id' })
    id: number;

    @CreateDateColumn({ name: 'create_timestamp' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'modify_timestamp' })
    updatedDate: Date;

    @Column({ name: 'site_user_id' })
    ownerId: number;

    @Column({
        type: 'enum',
        enum: GameEnum
    })
    gameType: GameEnum;

    @Column()
    name: string;

    @Column({ type: 'jsonb', name: 'value' })
    data: any;

    constructor(name: string, ownerId: number) {
        this.name = name;
        this.ownerId = ownerId;
    }
}

@Entity({ name: 'sheet' })
export class Pathfinder1stSheetEntity extends SheetEntity {
    @Column({
        type: 'enum',
        enum: GameEnum
    })
    gameType = GameEnum.Pathfinder1stEdition;

    @Column({ type: 'jsonb' })
    data = new Pathfinder1stCharacterData();

    constructor(name: string, ownerId: number) {
        super(name, ownerId);
        this.data = new Pathfinder1stCharacterData();
    }
}
