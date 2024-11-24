// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LandTitleDeed is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _deedIds;

    struct TitleDeed {
        uint256 titleDeedNumber;
        uint256 userId;
        string transactionHash;
        string titleDeedName;
        string landCode;
        string ownerNationId;
        string ownerPhoneNumber;
        string landType;
        string landLayoutUrl;
    }

    mapping(uint256 => TitleDeed) private titleDeeds;
    mapping(uint256 => uint256[]) private userToTitleDeeds;
    mapping(string => uint256) private landCodeToDeedId;

    event TitleDeedMinted(
        uint256 indexed titleDeedNumber,
        uint256 indexed userId,
        string transactionHash,
        string titleDeedName,
        string landCode,
        string ownerNationId,
        string ownerPhoneNumber,
        string landType,
        string landLayoutUrl
    );

    constructor() ERC721("LandTitleDeed", "LTD") Ownable(msg.sender) {}

    function mintTitleDeed(
        uint256 userId,
        string memory transactionHash,
        string memory titleDeedName,
        string memory landCode,
        string memory ownerNationId,
        string memory ownerPhoneNumber,
        string memory landType,
        string memory landLayoutUrl
    ) public onlyOwner {
        _deedIds.increment();
        uint256 newDeedId = _deedIds.current();

        _safeMint(msg.sender, newDeedId);

        TitleDeed memory newTitleDeed = TitleDeed({
            titleDeedNumber: newDeedId,
            userId: userId,
            transactionHash: transactionHash,
            titleDeedName: titleDeedName,
            landCode: landCode,
            ownerNationId: ownerNationId,
            ownerPhoneNumber: ownerPhoneNumber,
            landType: landType,
            landLayoutUrl: landLayoutUrl
        });

        titleDeeds[newDeedId] = newTitleDeed;
        userToTitleDeeds[userId].push(newDeedId);
        landCodeToDeedId[landCode] = newDeedId;

        emit TitleDeedMinted(
            newDeedId,
            userId,
            transactionHash,
            titleDeedName,
            landCode,
            ownerNationId,
            ownerPhoneNumber,
            landType,
            landLayoutUrl
        );
    }

    function getTitleDeedsByUser(
        uint256 userId
    ) public view returns (TitleDeed[] memory) {
        uint256[] memory deedIds = userToTitleDeeds[userId];
        TitleDeed[] memory deeds = new TitleDeed[](deedIds.length);

        for (uint256 i = 0; i < deedIds.length; i++) {
            deeds[i] = titleDeeds[deedIds[i]];
        }

        return deeds;
    }

    function getTitleDeedByLandCode(
        string memory landCode
    ) public view returns (TitleDeed memory) {
        uint256 deedId = landCodeToDeedId[landCode];
        require(
            isDeedValid(deedId),
            "Title deed does not exist for the provided land code"
        );
        return titleDeeds[deedId];
    }

    function getTitleDeedById(
        uint256 deedId
    ) public view returns (TitleDeed memory) {
        require(isDeedValid(deedId), "Title deed does not exist");
        return titleDeeds[deedId];
    }

    function isDeedValid(uint256 deedId) internal view returns (bool) {
        try this.ownerOf(deedId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }
}
