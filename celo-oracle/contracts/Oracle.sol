
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Oracle is Ownable {
    using Counters for Counters.Counter;

    struct Request {
        address requester;
        string url;
        string path;
        uint256 timestamp;
        bool isCompleted;
        uint256 result;
    }

    Counters.Counter private requestIdCounter;
    mapping(uint256 => Request) private requests;

    event RequestCreated(uint256 indexed requestId, address indexed requester, string url, string path, uint256 timestamp);
    event RequestFulfilled(uint256 indexed requestId, uint256 result);

    function createRequest(string memory url, string memory path) external {
        requestIdCounter.increment();
        uint256 requestId = requestIdCounter.current();

        requests[requestId] = Request({
            requester: msg.sender,
            url: url,
            path: path,
            timestamp: block.timestamp,
            isCompleted: false,
            result: 0
        });

        emit RequestCreated(requestId, msg.sender, url, path, block.timestamp);
    }

    function fulfillRequest(uint256 requestId, uint256 result) external onlyOwner {
        require(!requests[requestId].isCompleted, "Request has already been fulfilled");

        requests[requestId].isCompleted = true;
        requests[requestId].result = result;

        emit RequestFulfilled(requestId, result);
    }

    function getRequest(uint256 requestId) external view returns (Request memory) {
        return requests[requestId];
    }

    function getData() public view returns (uint256) {
        Request memory request = requests[requestIdCounter.current()];
        require(request.isCompleted, "Request is not yet fulfilled");
        return request.result;
    }
}
